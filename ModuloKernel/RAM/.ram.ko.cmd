cmd_/home/carloscariasingenieria/Resource-Monitor/ModuloKernel/RAM/ram.ko := ld -r -m elf_x86_64  -z max-page-size=0x200000  --build-id  -T ./scripts/module-common.lds -o /home/carloscariasingenieria/Resource-Monitor/ModuloKernel/RAM/ram.ko /home/carloscariasingenieria/Resource-Monitor/ModuloKernel/RAM/ram.o /home/carloscariasingenieria/Resource-Monitor/ModuloKernel/RAM/ram.mod.o;  true