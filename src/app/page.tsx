'use client';

import React, { useState, useCallback } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import type { IDetectedBarcode, BarcodeFormat } from '@yudiel/react-qr-scanner';

const ScanPage: React.FC = () => {
  const [scanResult, setScanResult] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [scanHistory, setScanHistory] = useState<IDetectedBarcode[]>([]);

  // 处理扫描结果
  const handleScan = useCallback((detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes && detectedCodes.length > 0) {
      const latestCode = detectedCodes[0];
      setScanResult(latestCode.rawValue);
      setScanHistory(prev => [latestCode, ...prev.slice(0, 9)]); // 保留最近10条记录
      console.log('扫描结果:', latestCode);
    }
  }, []);

  // 处理扫描错误
  const handleError = useCallback((error: unknown) => {
    console.error('扫描错误:', error);
    setError(error instanceof Error ? error.message : '扫描时发生未知错误');
  }, []);

  // 重新开始扫描
  const handleRescan = () => {
    setScanResult('');
    setError('');
    setIsScanning(true);
  };

  // 暂停/恢复扫描
  const toggleScanning = () => {
    setIsScanning(prev => !prev);
  };

  // 清空历史记录
  const clearHistory = () => {
    setScanHistory([]);
  };

  // 支持的扫码格式
  const supportedFormats: BarcodeFormat[] = [
    'qr_code',
    'ean_13',
    'ean_8',
    'code_128',
    'code_39',
    'code_93',
    'codabar',
    'databar',
    'databar_expanded',
    'data_matrix',
    'pdf417',
    'aztec',
    'micro_qr_code',
    'maxi_code',
    'upc_a',
    'upc_e'
  ];

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        二维码/条形码扫描器
      </h1>

      {/* 扫描器容器 */}
      <div style={{
        border: '2px solid #e0e0e0',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '400px', 
          margin: '0 auto',
          aspectRatio: '1',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#000'
        }}>
          <Scanner
            onScan={handleScan}
            onError={handleError}
            paused={!isScanning}
            formats={supportedFormats}
            constraints={{
              video: {
                width: { ideal: 400 },
                height: { ideal: 400 },
                facingMode: 'environment' // 使用后置摄像头
              }
            }}
            components={{
              finder: true,
              torch: true,
              zoom: true
            }}
            styles={{
              container: {
                width: '100%',
                height: '100%'
              },
              video: {
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              },
              finderBorder: 2
            }}
            scanDelay={300}
            allowMultiple={false}
            sound={true}
          />
        </div>

        {/* 控制按钮 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '10px', 
          marginTop: '20px' 
        }}>
          <button
            onClick={toggleScanning}
            style={{
              padding: '10px 20px',
              backgroundColor: isScanning ? '#dc3545' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            {isScanning ? '暂停扫描' : '开始扫描'}
          </button>
          
          <button
            onClick={handleRescan}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            重新扫描
          </button>
        </div>
      </div>

      {/* 扫描结果显示 */}
      {scanResult && (
        <div style={{
          border: '2px solid #28a745',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px',
          backgroundColor: '#d4edda'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#155724' }}>扫描结果：</h3>
          <p style={{ 
            margin: '0',
            padding: '10px',
            backgroundColor: 'white',
            borderRadius: '4px',
            wordBreak: 'break-all',
            fontSize: '14px',
            fontFamily: 'monospace'
          }}>
            {scanResult}
          </p>
        </div>
      )}

      {/* 错误信息显示 */}
      {error && (
        <div style={{
          border: '2px solid #dc3545',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px',
          backgroundColor: '#f8d7da'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#721c24' }}>扫描错误：</h3>
          <p style={{ margin: '0', color: '#721c24' }}>{error}</p>
        </div>
      )}

      {/* 扫描历史 */}
      {scanHistory.length > 0 && (
        <div style={{
          border: '2px solid #17a2b8',
          borderRadius: '8px',
          padding: '15px',
          backgroundColor: '#d1ecf1'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <h3 style={{ margin: '0', color: '#0c5460' }}>扫描历史：</h3>
            <button
              onClick={clearHistory}
              style={{
                padding: '5px 15px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              清空历史
            </button>
          </div>
          
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {scanHistory.map((code, index) => (
              <div
                key={index}
                style={{
                  padding: '8px',
                  marginBottom: '8px',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  fontSize: '12px',
                  border: '1px solid #bee5eb'
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  格式: {code.format}
                </div>
                <div style={{ 
                  wordBreak: 'break-all',
                  fontFamily: 'monospace',
                  color: '#495057'
                }}>
                  {code.rawValue}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 使用说明 */}
      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#495057' }}>使用说明：</h4>
        <ul style={{ margin: '0', paddingLeft: '20px', color: '#6c757d', fontSize: '14px' }}>
          <li>将二维码或条形码对准摄像头进行扫描</li>
          <li>支持多种格式：QR码、EAN、Code128、PDF417等</li>
          <li>可以使用控制按钮暂停或重新开始扫描</li>
          <li>扫描历史会自动保存最近10条记录</li>
          <li>如遇到错误，请检查摄像头权限或网络连接</li>
        </ul>
      </div>
    </div>
  );
};

export default ScanPage;