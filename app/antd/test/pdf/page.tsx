"use client";

import { Line } from "@ant-design/charts";
import { DownloadOutlined, EyeOutlined, FilePdfOutlined, FileTextOutlined } from "@ant-design/icons";
import { Document, PDFViewer, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer";
import { Button, Card, Col, Divider, Radio, Row, Space, Typography } from "antd";
import React, { useState } from "react";

const { Title, Paragraph } = Typography;

// PDF样式定义
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#1890ff",
    fontWeight: "bold",
  },
  section: {
    margin: 10,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: "#262626",
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
    color: "#595959",
  },
  table: {
    Display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 10,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
    padding: 5,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#8c8c8c",
  },
});

// 模拟图表数据
const chartData = [
  { year: "2019", value: 3 },
  { year: "2020", value: 4 },
  { year: "2021", value: 3.5 },
  { year: "2022", value: 5 },
  { year: "2023", value: 4.9 },
  { year: "2024", value: 6 },
];

// PDF文档组件
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* 标题 */}
      <Text style={styles.header}>Magnify AI - 数据分析报告</Text>

      {/* 概述部分 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>项目概述</Text>
        <Text style={styles.text}>
          本报告展示了Magnify AI平台的核心功能和数据分析结果。
          该平台专注于招投标项目的智能分析和评估，为用户提供全面的决策支持。
        </Text>
      </View>

      {/* 数据统计部分 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>关键指标</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>指标名称</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>当前值</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>目标值</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>完成率</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>项目数量</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>156</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>200</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>78%</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>成功率</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>85%</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>90%</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>94%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 分析结果部分 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>分析结果</Text>
        <Text style={styles.text}>
          • 项目评估准确率达到85%，超出预期目标
        </Text>
        <Text style={styles.text}>
          • 用户满意度持续提升，达到4.8/5.0
        </Text>
        <Text style={styles.text}>
          • 系统响应时间优化至平均200ms以内
        </Text>
        <Text style={styles.text}>
          • 数据处理能力提升40%，支持更大规模分析
        </Text>
      </View>

      {/* 页脚 */}
      <Text style={styles.footer}>
        生成时间: {new Date().toLocaleString("zh-CN")} | Magnify AI © 2024
      </Text>
    </Page>
  </Document>
);

const PDFTestPage: React.FC = () => {
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [pdfType, setPdfType] = useState<"generated" | "existing">("generated");

  // 图表配置
  const config = {
    data: chartData,
    xField: "year",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
    color: "#1890ff",
    smooth: true,
  };

  // 下载PDF
  const downloadPDF = async () => {
    const blob = await pdf(<MyDocument />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "magnify-ai-report.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  // 下载现有PDF
  const downloadExistingPDF = () => {
    const link = document.createElement("a");
    link.href = "/GraphRAG和规则判断引导的大语言模型咨询服务系统.pdf";
    link.download = "GraphRAG和规则判断引导的大语言模型咨询服务系统.pdf";
    link.click();
  };

  return (
    <div style={{ padding: "24px", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "32px" }}>
        <FileTextOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
        PDF 测试页面
      </Title>

      <Row gutter={[24, 24]}>
        {/* 左侧：图表展示 */}
        <Col xs={24} lg={12}>
          <Card title="数据趋势图表" bordered={false}>
            <Line {...config} />
            <Paragraph style={{ marginTop: "16px", color: "#666" }}>
              这是一个使用 @ant-design/charts 创建的折线图，展示了年度数据趋势。
            </Paragraph>
          </Card>
        </Col>

        {/* 右侧：PDF操作 */}
        <Col xs={24} lg={12}>
          <Card title="PDF 文档操作" bordered={false}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              {/* PDF类型选择 */}
              <div>
                <Title level={4} style={{ marginBottom: "12px" }}>选择PDF类型：</Title>
                <Radio.Group
                  value={pdfType}
                  onChange={(e) => setPdfType(e.target.value)}
                  style={{ marginBottom: "16px" }}
                >
                  <Radio.Button value="generated">
                    <FileTextOutlined style={{ marginRight: "4px" }} />
                    生成的PDF
                  </Radio.Button>
                  <Radio.Button value="existing">
                    <FilePdfOutlined style={{ marginRight: "4px" }} />
                    现有PDF文档
                  </Radio.Button>
                </Radio.Group>
              </div>

              <Paragraph>
                {pdfType === "generated"
                  ? "使用 @react-pdf/renderer 创建的PDF文档，包含了项目数据和分析结果。"
                  : "预览public目录下的现有PDF文档：GraphRAG和规则判断引导的大语言模型咨询服务系统.pdf"
                }
              </Paragraph>

              <Space size="middle">
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  onClick={() => setShowPDFViewer(!showPDFViewer)}
                >
                  {showPDFViewer ? "隐藏预览" : "预览PDF"}
                </Button>
                <Button
                  icon={<DownloadOutlined />}
                  onClick={pdfType === "generated" ? downloadPDF : downloadExistingPDF}
                >
                  下载PDF
                </Button>
              </Space>

              <Divider />

              <div>
                <Title level={4}>PDF 特性说明：</Title>
                {pdfType === "generated" ? (
                  <ul style={{ paddingLeft: "20px" }}>
                    <li>响应式布局设计</li>
                    <li>Ant Design 风格样式</li>
                    <li>数据表格展示</li>
                    <li>专业报告格式</li>
                    <li>自动生成时间戳</li>
                  </ul>
                ) : (
                  <ul style={{ paddingLeft: "20px" }}>
                    <li>学术研究文档</li>
                    <li>GraphRAG技术介绍</li>
                    <li>大语言模型咨询系统</li>
                    <li>规则判断引导机制</li>
                    <li>完整技术方案</li>
                  </ul>
                )}
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* PDF预览器 */}
      {showPDFViewer && (
        <Card
          title={`PDF 预览 - ${pdfType === "generated" ? "生成的报告" : "GraphRAG技术文档"}`}
          style={{ marginTop: "24px" }}
          bordered={false}
        >
          <div style={{ height: "600px", border: "1px solid #d9d9d9" }}>
            {pdfType === "generated" ? (
              <PDFViewer style={{ width: "100%", height: "100%" }}>
                <MyDocument />
              </PDFViewer>
            ) : (
              <iframe
                src="/GraphRAG和规则判断引导的大语言模型咨询服务系统.pdf"
                style={{ width: "100%", height: "100%", border: "none" }}
                title="GraphRAG技术文档"
              />
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default PDFTestPage;
