import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import CpuOverview from "./../components/blog/CpuOverview";
import RamOverview from "./../components/blog/RamOverview";
import Notas from "./../components/blog/Notas";
import NotasB from "./../components/blog/NotasB";

const BlogOverview = ({ smallStats }) => (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle title="RESOURCE MONITOR" subtitle="Carlos Eduardo Carias Salan - 201503750" className="text-sm-left mb-3" />
    </Row>

    <Row>
      {/* CPU Overview */}
      <Col lg="8" md="12" sm="12" className="mb-4">
        <CpuOverview />
      </Col>

      {/* RAM Overview */}
      <Col lg="8" md="12" sm="12" className="mb-4">
        <RamOverview />
      </Col>
    </Row>
    <Row>
      {/* Discussions */}
      <Col lg="5" md="12" sm="12" className="mb-4">
        <PageTitle title="SERVIDOR A" className="text-sm-left mb-3" />
        <Notas />
      </Col>
      
      {/* Discussions */}
      <Col lg="5" md="12" sm="12" className="mb-4">
        <PageTitle title="SERVIDOR B" className="text-sm-left mb-3" />
        <NotasB />
      </Col>
    </Row>
  </Container>
);

export default BlogOverview;
