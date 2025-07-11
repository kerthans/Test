"use client";

import { BugOutlined, FileSearchOutlined, LockOutlined, WarningOutlined } from "@ant-design/icons";
import { Button, Card, Space, Typography } from "antd";
import { useRouter } from "next/navigation";

const { Title, Paragraph } = Typography;

export default function ErrorTestPage() {
  const router = useRouter();

  const handleTest404 = () => {
    // 跳转到一个不存在的页面来触发404
    router.push("/non-existent-page-for-testing");
  };

  const handleTest403 = () => {
    // 跳转到403页面 - 使用正确的路由
    router.push("/forbidden");
  };

  const handleTest500 = () => {
    // 跳转到500页面 - 使用正确的路由
    router.push("/error");
  };

  const handleThrowError = () => {
    // 抛出一个错误来触发Next.js的错误边界
    throw new Error("测试错误：这是一个故意抛出的错误用于测试500页面");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <Title level={1}>
            <BugOutlined className="mr-3" />
            错误页面测试中心
          </Title>
          <Paragraph className="text-lg text-gray-600">
            点击下面的按钮来测试不同类型的错误页面效果
          </Paragraph>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 404测试 */}
          <Card
            title="404 页面测试"
            className="text-center hover:shadow-lg transition-shadow"
            styles={{ header: { backgroundColor: "#f0f0f0" } }}
          >
            <div className="mb-4">
              <FileSearchOutlined className="text-4xl text-blue-500 mb-2" />
              <Paragraph className="text-sm text-gray-600">
                测试页面未找到的情况
              </Paragraph>
            </div>
            <Button
              type="primary"
              block
              onClick={handleTest404}
              className="bg-blue-500 hover:bg-blue-600"
            >
              测试 404 错误
            </Button>
          </Card>

          {/* 403测试 */}
          <Card
            title="403 页面测试"
            className="text-center hover:shadow-lg transition-shadow"
            styles={{ header: { backgroundColor: "#f0f0f0" } }}
          >
            <div className="mb-4">
              <LockOutlined className="text-4xl text-orange-500 mb-2" />
              <Paragraph className="text-sm text-gray-600">
                测试权限不足的情况
              </Paragraph>
            </div>
            <Button
              type="primary"
              block
              onClick={handleTest403}
              className="bg-orange-500 hover:bg-orange-600"
            >
              测试 403 错误
            </Button>
          </Card>

          {/* 500测试 - 直接跳转 */}
          <Card
            title="500 页面测试"
            className="text-center hover:shadow-lg transition-shadow"
            styles={{ header: { backgroundColor: "#f0f0f0" } }}
          >
            <div className="mb-4">
              <WarningOutlined className="text-4xl text-red-500 mb-2" />
              <Paragraph className="text-sm text-gray-600">
                直接跳转到500页面
              </Paragraph>
            </div>
            <Button
              type="primary"
              block
              onClick={handleTest500}
              className="bg-red-500 hover:bg-red-600"
            >
              测试 500 错误
            </Button>
          </Card>

          {/* 500测试 - 抛出错误 */}
          <Card
            title="抛出错误测试"
            className="text-center hover:shadow-lg transition-shadow"
            styles={{ header: { backgroundColor: "#f0f0f0" } }}
          >
            <div className="mb-4">
              <BugOutlined className="text-4xl text-purple-500 mb-2" />
              <Paragraph className="text-sm text-gray-600">
                抛出JavaScript错误
              </Paragraph>
            </div>
            <Button
              type="primary"
              block
              onClick={handleThrowError}
              className="bg-purple-500 hover:bg-purple-600"
            >
              抛出错误
            </Button>
          </Card>
        </div>

        <div className="mt-12">
          <Card title="测试说明" className="bg-blue-50">
            <Space direction="vertical" size="middle" className="w-full">
              <div>
                <Title level={4}>🔍 404 测试</Title>
                <Paragraph>
                  点击"测试 404 错误"按钮会跳转到一个不存在的页面，触发Next.js的404页面。
                </Paragraph>
              </div>

              <div>
                <Title level={4}>🔒 403 测试</Title>
                <Paragraph>
                  点击"测试 403 错误"按钮会跳转到测试路由，显示权限不足的错误页面。
                </Paragraph>
              </div>

              <div>
                <Title level={4}>⚠️ 500 测试</Title>
                <Paragraph>
                  有两种方式测试500错误：
                  <br />1. 直接跳转到测试路由
                  <br />2. 抛出JavaScript错误，触发Next.js的错误边界
                </Paragraph>
              </div>
            </Space>
          </Card>
        </div>
      </div>
    </div>
  );
}
