#include <linux/fs.h>
#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/hugetlb.h>
#include <linux/module.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>

static int meminfo_proc_show(struct seq_file *m, void *v)
{
    struct sysinfo i;
    unsigned long pages[NR_LRU_LISTS];
    int lru;
#define K(x) ((x) << (PAGE_SHIFT - 10))
    si_meminfo(&i);
    for (lru = LRU_BASE; lru < NR_LRU_LISTS; lru++)
        pages[lru] = global_numa_state(NR_LRU_BASE + lru);        
    seq_printf(m, "{");
    seq_printf(m, "\"used\":");
	seq_put_decimal_ull(m, " ", jiffies_64_to_clock_t((K(i.totalram)-K(i.freeram))/1024));
    seq_printf(m, ",\"free\":");
	seq_put_decimal_ull(m, " ", jiffies_64_to_clock_t(K(i.freeram)/1024));
    seq_printf(m, "}");
#undef K
    return 0;
}

static void __exit final(void)
{
    printk(KERN_INFO "Cleaning Up.\n");
}

static int meminfo_proc_open(struct inode *inode, struct file *file)
{
    return single_open(file, meminfo_proc_show, NULL);
}

static const struct file_operations meminfo_proc_fops = {
    .open = meminfo_proc_open,
    .read = seq_read,
    .llseek = seq_lseek,
    .release = single_release,
};
static int __init inicio(void)
{
    proc_create("ram-info", 0, NULL, &meminfo_proc_fops);
    return 0;
}
module_init(inicio);
module_exit(final);

MODULE_LICENSE("GPL");


