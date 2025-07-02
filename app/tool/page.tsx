'use client'

import Image from "next/image";

import { Button, Card, Space, Typography, Tag, Divider, Row, Col } from "antd";
import { GithubOutlined, BookOutlined, CodeOutlined } from '@ant-design/icons';
import { useState } from "react";

const { Title, Text, Paragraph } = Typography;

interface ComponentLibrary {
  name: string;
  description: string;
  category: string;
  website: string;
  github?: string;
  docs: string;
  logo?: string;
  tags: string[];
  color: string;
}

const componentLibraries: ComponentLibrary[] = [
  {
    name: "Ant Design",
    description: "企业级 UI 设计语言和 React 组件库",
    category: "React",
    website: "https://ant.design/",
    github: "https://github.com/ant-design/ant-design",
    docs: "https://ant.design/docs/react/introduce-cn",
    tags: ["React", "TypeScript", "企业级", "完整"],
    color: "#1890ff"
  },
  {
    name: "Material-UI (MUI)",
    description: "React 组件库，实现了 Google 的 Material Design",
    category: "React",
    website: "https://mui.com/",
    github: "https://github.com/mui/material-ui",
    docs: "https://mui.com/getting-started/",
    tags: ["React", "Material Design", "TypeScript"],
    color: "#007FFF"
  },
  {
    name: "Chakra UI",
    description: "简单、模块化且易于访问的 React 组件库",
    category: "React",
    website: "https://chakra-ui.com/",
    github: "https://github.com/chakra-ui/chakra-ui",
    docs: "https://chakra-ui.com/docs/getting-started",
    tags: ["React", "简单", "模块化", "无障碍"],
    color: "#319795"
  },
  {
    name: "Element Plus",
    description: "基于 Vue 3 的桌面端组件库",
    category: "Vue",
    website: "https://element-plus.org/",
    github: "https://github.com/element-plus/element-plus",
    docs: "https://element-plus.org/zh-CN/guide/design.html",
    tags: ["Vue 3", "桌面端", "完整"],
    color: "#409EFF"
  },
  {
    name: "Naive UI",
    description: "Vue 3 组件库，比较完整，主题可调，使用 TypeScript",
    category: "Vue",
    website: "https://www.naiveui.com/",
    github: "https://github.com/tusen-ai/naive-ui",
    docs: "https://www.naiveui.com/zh-CN/os-theme/docs/introduction",
    tags: ["Vue 3", "TypeScript", "主题"],
    color: "#18a058"
  },
  {
    name: "Tailwind UI",
    description: "由 Tailwind CSS 团队制作的精美 UI 组件",
    category: "CSS",
    website: "https://tailwindui.com/",
    docs: "https://tailwindui.com/documentation",
    tags: ["Tailwind CSS", "付费", "精美"],
    color: "#06B6D4"
  },
  {
    name: "Bootstrap",
    description: "世界上最流行的前端组件库",
    category: "CSS",
    website: "https://getbootstrap.com/",
    github: "https://github.com/twbs/bootstrap",
    docs: "https://getbootstrap.com/docs/",
    tags: ["CSS", "响应式", "经典"],
    color: "#7952B3"
  },
  {
    name: "Mantine",
    description: "功能齐全的 React 组件库",
    category: "React",
    website: "https://mantine.dev/",
    github: "https://github.com/mantinedev/mantine",
    docs: "https://mantine.dev/getting-started/",
    tags: ["React", "功能齐全", "现代"],
    color: "#339AF0"
  },
  {
    name: "Arco Design",
    description: "字节跳动出品的企业级设计系统",
    category: "React",
    website: "https://arco.design/",
    github: "https://github.com/arco-design/arco-design",
    docs: "https://arco.design/react/docs/start",
    tags: ["React", "Vue", "字节跳动", "企业级"],
    color: "#165DFF"
  },
  {
    name: "Semi Design",
    description: "抖音前端团队与 UED 团队共同设计开发并维护的设计系统",
    category: "React",
    website: "https://semi.design/",
    github: "https://github.com/DouyinFE/semi-design",
    docs: "https://semi.design/zh-CN/start/introduction",
    tags: ["React", "抖音", "设计系统"],
    color: "#3CCF91"
  }
];

const categories = ["全部", "React", "Vue", "CSS"];

export default function ComponentLibraryHub() {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  
  const filteredLibraries = selectedCategory === "全部" 
    ? componentLibraries 
    : componentLibraries.filter(lib => lib.category === selectedCategory);

  const renderLibraryCard = (library: ComponentLibrary) => (
    <Card
      key={library.name}
      className="h-full hover:shadow-lg transition-shadow duration-300"
      bodyStyle={{ padding: '20px' }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-3">
          <div 
            className="w-3 h-3 rounded-full mr-3"
            style={{ backgroundColor: library.color }}
          />
          <Title level={4} className="!mb-0 flex-1">{library.name}</Title>
          <Tag color={library.color}>{library.category}</Tag>
        </div>
        
        <Paragraph className="text-gray-600 dark:text-gray-300 flex-1 !mb-4">
          {library.description}
        </Paragraph>
        
        <div className="mb-4">
          <Space size={[4, 8]} wrap>
            {library.tags.map(tag => (
              <Tag key={tag} className="text-xs">{tag}</Tag>
            ))}
          </Space>
        </div>
        
        <div className="flex gap-2 mt-auto">
          <Button 
            type="primary" 
            icon={<GithubOutlined />}
            href={library.website}
            target="_blank"
            size="small"
          >
            官网
          </Button>
          <Button 
            icon={<BookOutlined />}
            href={library.docs}
            target="_blank"
            size="small"
          >
            文档
          </Button>
          {library.github && (
            <Button 
              icon={<GithubOutlined />}
              href={library.github}
              target="_blank"
              size="small"
            >
              GitHub
            </Button>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* 页面标题 */}
      <div className="text-center mb-8">
        <Title level={1} className="!mb-2">
          <CodeOutlined className="mr-3" />
          前端组件库工具箱
        </Title>
        <Text type="secondary" className="text-lg">
          Frontend Component Library Toolbox - 收集和整理常用的前端组件库资源
        </Text>
      </div>

      {/* 统计信息 */}
      <div className="max-w-7xl mx-auto mb-8">
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Card className="text-center">
              <Title level={2} className="!mb-1 text-blue-600">{componentLibraries.length}</Title>
              <Text type="secondary">组件库总数</Text>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="text-center">
              <Title level={2} className="!mb-1 text-green-600">
                {componentLibraries.filter(lib => lib.category === 'React').length}
              </Title>
              <Text type="secondary">React 组件库</Text>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="text-center">
              <Title level={2} className="!mb-1 text-purple-600">
                {componentLibraries.filter(lib => lib.category === 'Vue').length}
              </Title>
              <Text type="secondary">Vue 组件库</Text>
            </Card>
          </Col>
        </Row>
      </div>

      {/* 分类筛选 */}
      <div className="max-w-7xl mx-auto mb-8">
        <Card>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Text strong className="text-lg">分类筛选:</Text>
            <Space wrap>
              {categories.map(category => (
                <Button
                  key={category}
                  type={selectedCategory === category ? "primary" : "default"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </Space>
          </div>
        </Card>
      </div>

      {/* 组件库展示 */}
      <div className="max-w-7xl mx-auto">
        <Row gutter={[16, 16]}>
          {filteredLibraries.map(library => (
            <Col key={library.name} xs={24} sm={12} lg={8} xl={6}>
              {renderLibraryCard(library)}
            </Col>
          ))}
        </Row>
      </div>

      <Divider className="!my-12" />

      {/* 快速链接区域 */}
      <div className="max-w-7xl mx-auto">
        <Card title="🔗 快速链接" className="mb-8">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card size="small" className="text-center hover:shadow-md transition-shadow">
                <Button type="link" href="https://www.npmjs.com/" target="_blank" block>
                  📦 NPM 包管理
                </Button>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card size="small" className="text-center hover:shadow-md transition-shadow">
                <Button type="link" href="https://bundlephobia.com/" target="_blank" block>
                  📊 包大小分析
                </Button>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card size="small" className="text-center hover:shadow-md transition-shadow">
                <Button type="link" href="https://caniuse.com/" target="_blank" block>
                  🌐 浏览器兼容性
                </Button>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card size="small" className="text-center hover:shadow-md transition-shadow">
                <Button type="link" href="https://github.com/trending" target="_blank" block>
                  🔥 GitHub 趋势
                </Button>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>

      {/* 底部信息 */}
      <div className="text-center py-8 border-t border-gray-200 dark:border-gray-700">
        <Text type="secondary">
          前端组件库工具箱 - 持续更新中，欢迎贡献更多优秀的组件库资源 🚀
        </Text>
      </div>
    </div>
  );
}