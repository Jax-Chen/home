package com.jesse.common.utils;

import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 获得本服务器名称,ip的工具类
 * 
 */
public class HostUtil {

	private static final Log logger = LogFactory.getLog(HostUtil.class);

	private static final HostInfo hostInfo = new HostInfo();

	private static final Ipv4Info ipv4Info = new Ipv4Info();

	public static final HostInfo getHostInfo() {
		return hostInfo;
	}

	public static final Ipv4Info getIpv4Info() {
		return ipv4Info;
	}

	public static final class HostInfo {
		private final String HOST_NAME;

		private final String HOST_ADDRESS;

		private HostInfo() {
			String hostName;
			String hostAddress;
			try {
				InetAddress localhost = InetAddress.getLocalHost();
				hostName = localhost.getHostName();
				hostAddress = localhost.getHostAddress();
			} catch (UnknownHostException e) {
				logger.error("error then get host info", e);
				hostName = "localhost";
				hostAddress = "127.0.0.1";
			}
			HOST_NAME = hostName;
			HOST_ADDRESS = hostAddress;

		}

		public final String getName() {
			return HOST_NAME;
		}

		public final String getAddress() {
			return HOST_ADDRESS;
		}
	}

	public static final class Ipv4Info {
		private final Collection<String> address;

		private Ipv4Info() {
			List<String> as = new ArrayList<String>();
			try {
				for (Enumeration<NetworkInterface> netInterfaces = NetworkInterface
						.getNetworkInterfaces(); netInterfaces
						.hasMoreElements();) {
					NetworkInterface ni = (NetworkInterface) netInterfaces
							.nextElement();
					for (Enumeration<InetAddress> en = ni.getInetAddresses(); en
							.hasMoreElements();) {
						InetAddress ip = en.nextElement();
						if (!ip.isLoopbackAddress()
								&& (ip instanceof Inet4Address)) {
							as.add(ip.getHostAddress());
						}
					}
				}
			} catch (SocketException e) {
				logger.error("error then getNetworkInterfaces.", e);
			}
			address = Collections.unmodifiableList(as);
		}

		/**
		 * 得到本机配置的所有ipv4地址
		 * 
		 * @return
		 */
		public final Collection<String> getAddress() {
			return address;
		}

		/**
		 * 得到ipv4地址中的第一个
		 * 
		 * @return
		 */
		public final String getFristAddress() {
			if (address.isEmpty()) {
				return null;
			}
			return address.iterator().next();
		}
	}
}
