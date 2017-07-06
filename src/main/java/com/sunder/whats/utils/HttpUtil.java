package com.sunder.whats.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ytx.org.apache.http.HttpEntity;
import ytx.org.apache.http.HttpHost;
import ytx.org.apache.http.HttpResponse;
import ytx.org.apache.http.auth.AuthScope;
import ytx.org.apache.http.auth.UsernamePasswordCredentials;
import ytx.org.apache.http.client.entity.UrlEncodedFormEntity;
import ytx.org.apache.http.client.methods.HttpGet;
import ytx.org.apache.http.client.methods.HttpPost;
import ytx.org.apache.http.conn.params.ConnRouteParams;
import ytx.org.apache.http.entity.StringEntity;
import ytx.org.apache.http.impl.client.DefaultHttpClient;
import ytx.org.apache.http.message.BasicNameValuePair;
import ytx.org.apache.http.params.CoreConnectionPNames;
import ytx.org.apache.http.util.EntityUtils;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.*;
import java.util.Map.Entry;

/**
 * http工具类
 * 
 * @author Shiwei.Xiao
 * 
 */
public class HttpUtil {

	private static Logger logger = LoggerFactory.getLogger(HttpUtil.class);

	/**
	 * 设置请求时：请求的url，请求参数，代理相关信息
	 * 
	 * @author Shiwei.Xiao
	 * 
	 */
	public class HttpInfo {
		// 请求的地址
		private String url;
		// 请求参数
		private Map<String, String> params;
		//请求xml格式
		private String xmlStr;
		// 代理地址
		private String proxyHost;
		// 代理duank
		private int proxyPort;
		// 代理用户用户名
		private String userName;
		// 代理密码
		private String password;
		// 请求或相应的编码方式
		private String encoding;
		// 请求超时时间
		private int timeOut;

		public HttpInfo(String url, Map<String, String> params, String xmlStr, String proxyHost, int proxyPort, String userName, String password, int timeOut, String encoding) {
			this.url = url;
			this.params = params;
			this.proxyHost = proxyHost;
			this.proxyPort = proxyPort;
			this.userName = userName;
			this.password = password;
			this.encoding = encoding;
			this.timeOut = timeOut;
			this.xmlStr = xmlStr;
		}

		public HttpInfo(String url, Map<String, String> params, String xmlStr, int timeOut, String encoding) {
			this.url = url;
			this.params = params;
			this.encoding = encoding;
			this.timeOut = timeOut;
			this.xmlStr = xmlStr;
		}

		public String getUrl() {
			return url;
		}

		public void setUrl(String url) {
			this.url = url;
		}

		public Map<String, String> getParams() {
			return params;
		}

		public void setParams(Map<String, String> params) {
			this.params = params;
		}

		public String getXmlStr() {
			return xmlStr;
		}

		public void setXmlStr(String xmlStr) {
			this.xmlStr = xmlStr;
		}

		public String getProxyHost() {
			return proxyHost;
		}

		public void setProxyHost(String proxyHost) {
			this.proxyHost = proxyHost;
		}

		public int getProxyPort() {
			return proxyPort;
		}

		public void setProxyPort(int proxyPort) {
			this.proxyPort = proxyPort;
		}

		public String getUserName() {
			return userName;
		}

		public void setUserName(String userName) {
			this.userName = userName;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public String getEncoding() {
			return encoding;
		}

		public void setEncoding(String encoding) {
			this.encoding = encoding;
		}

		public int getTimeOut() {
			return timeOut;
		}

		public void setTimeOut(int timeOut) {
			this.timeOut = timeOut;
		}

		
	}

	/**
	 * 获取HttpInfo对象
	 * 
	 * @param url
	 *            请求的地址
	 * @param params
	 *            请求参数
	 * @param proxyHost
	 *            代理地址
	 * @param proxyPort
	 *            代理端口
	 * @param userName
	 *            代理用户用户名
	 * @param password
	 *            代理密码
	 * @param timeOut
	 *            超时时间
	 * @param encoding
	 *            编码方式
	 * @return
	 */
	public static HttpInfo getHttpInfo(String url, Map<String, String> params, String xmlStr, String proxyHost, int proxyPort, String userName, String password, int timeOut, String encoding) {
		return new HttpUtil().new HttpInfo(url, params,xmlStr, proxyHost, proxyPort, userName, password, timeOut, encoding);
	}

	/**
	 * 获取HttpInfo对象
	 * 
	 * @param url
	 *            请求的地址
	 * @param params
	 *            请求参数
	 * @param encoding
	 *            编码方式
	 * @return
	 */
	public static HttpInfo getHttpInfo(String url, Map<String, String> params, String xmlStr, int timeOut, String encoding) {
		return new HttpUtil().new HttpInfo(url, params, xmlStr,timeOut, encoding);
	}

	/**
	 * 实例化httpclient
	 * 
	 * @param httpInfo
	 *            请求的url，请求参数，代理相关信息
	 * @return
	 */
	private static DefaultHttpClient getDefaultHttpClient(HttpInfo httpInfo) {
		// 默认的client类。
		DefaultHttpClient httpclient = new DefaultHttpClient();
		if (StringUtil.isNotBlank(httpInfo.getProxyHost())) {
			httpclient.getCredentialsProvider().setCredentials(new AuthScope(httpInfo.getProxyHost(), httpInfo.getProxyPort()),
						new UsernamePasswordCredentials(
								StringUtil.isNotBlank(httpInfo.getUserName())?httpInfo.getUserName():"", 
								StringUtil.isNotBlank(httpInfo.getPassword())?httpInfo.getPassword():""));
			HttpHost proxy = new HttpHost(httpInfo.getProxyHost(), httpInfo.getProxyPort());
			httpclient.getParams().setParameter(ConnRouteParams.DEFAULT_PROXY, proxy);
		}
		httpclient.getParams().setParameter(CoreConnectionPNames.CONNECTION_TIMEOUT, httpInfo.getTimeOut());
		httpclient.getParams().setParameter(CoreConnectionPNames.SO_TIMEOUT, httpInfo.getTimeOut());
		return httpclient;
	}

	/**
	 * get请求
	 * 
	 * @param httpInfo
	 *            请求的url，请求参数，代理相关信息
	 * @throws Exception
	 */
	public static String httpGet(HttpInfo httpInfo) throws Exception {

		String resStr = null;
		DefaultHttpClient httpclient = getDefaultHttpClient(httpInfo);
		try {
			// 设置为get取连接的方式.
			HttpGet get = new HttpGet(httpInfo.getUrl());
			// 得到返回的response.
			HttpResponse response = httpclient.execute(get);
			// 得到返回的client里面的实体对象信息.
			HttpEntity entity = response.getEntity();
			if (entity != null) {
				resStr = EntityUtils.toString(entity, httpInfo.getEncoding());
			}
			logger.info("http get :" + response.getStatusLine() + resStr);
			return resStr;
		} catch (Exception e) {
			logger.error("http get exception", e);
			throw e;
		} finally {
			// 关闭请求
			httpclient.getConnectionManager().shutdown();
		}
	}

	/**
	 * post请求
	 * 
	 * @param httpInfo
	 *            请求的url，请求参数，代理相关信息
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static String httpPost(HttpInfo httpInfo) throws Exception {
		String resStr = null;
		DefaultHttpClient httpclient = getDefaultHttpClient(httpInfo);
		try {
			HttpPost httpost = new HttpPost(httpInfo.getUrl());
			// 添加参数
			List nvps = new ArrayList();
			Map<String, String> params = httpInfo.getParams();
			if (params != null && !params.isEmpty()) {
				Set<Entry<String, String>> set = params.entrySet();
				for (Entry<String, String> entry : set) {
					nvps.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
				}
			}
			if(StringUtil.isNotBlank(httpInfo.getXmlStr())){
				StringEntity xmlEntity = new StringEntity(httpInfo.getXmlStr(),httpInfo.getEncoding()); 
				httpost.addHeader("Content-Type", "text/xml"); 
				httpost.setEntity(xmlEntity); 	
			}
			if(nvps.size() > 0){
				httpost.setEntity(new UrlEncodedFormEntity(nvps, httpInfo.getEncoding()));
			}
			HttpResponse response = httpclient.execute(httpost);
			HttpEntity entity = response.getEntity();
			if (entity != null) {
				resStr = EntityUtils.toString(entity, httpInfo.getEncoding());
			}
			logger.info("http post :" + response.getStatusLine() + resStr);
			return resStr;
		} catch (Exception e) {
			logger.error("http post exception", e);
			throw e;
		} finally {
			// 关闭请求
			httpclient.getConnectionManager().shutdown();
		}
	}
	
	/**
	 * 获得本机ip
	 * */

	public static String hostIpAddress() {
		// Modified by YuYuan 2014/05/07
		String hostIp = null;
		try {
			InetAddress addr = InetAddress.getLocalHost();
			hostIp = addr.getHostAddress();
		} catch (UnknownHostException e) {
			logger.info(e.getMessage());
		}
		return hostIp;
	}

	public static void main(String[] args) throws Exception {

		logger.info("------------------");
		Map<String, String> params = new HashMap<String, String>();
		params.put("#wd", "aab");
		HttpInfo info = HttpUtil.getHttpInfo("http://www.baidu.com", params,"", "10.195.113.100", 8002, null, null, 6000, "GBK");

		logger.info(HttpUtil.httpGet(info));

		logger.info(HttpUtil.httpPost(info));

		logger.info("------------------");
	}

}
