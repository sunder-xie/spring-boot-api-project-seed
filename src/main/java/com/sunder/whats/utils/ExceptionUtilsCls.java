package com.sunder.whats.utils;

import com.alibaba.fastjson.JSONObject;
import com.sunder.xie.whats.common.pojo.CustomException;
import com.sunder.xie.whats.common.utils.cloopen.LoggerUtil;

import java.io.PrintWriter;
import java.io.StringWriter;

public class ExceptionUtilsCls {
	
	/**
	 * 异常工具类
	 * @param customException
	 * @param ex
	 * @param params 参数列表
	 * @return
	 */
	public static Boolean putCustomException(CustomException customException, Exception ex , String params){
		Boolean flag = false;
		try{
			if(null != params){
				customException.setParams(params);
			}
			//记录异常日志
			if(null != ex){
				StringWriter sw = new StringWriter();
	            ex.printStackTrace(new PrintWriter(sw, true));
	            String str = sw.toString();
	            if(str.length() > 4096){
	            	customException.setRemark(str.substring(0,4000));
	            }
			}
			if(null != ex && null != ex.getMessage()){			
				JSONObject jsonObject = null ;
				if(ex.getMessage().startsWith("{") && ex.getMessage().endsWith("}")){
					jsonObject = JSONObject.parseObject(ex.getMessage());
				}
				if(null != jsonObject){
					customException.setCode(jsonObject.getString("code"));
					customException.setMsg(jsonObject.getString("msg"));
					flag = true;
				}				
			}	
		}catch(Exception e){
			LoggerUtil.fatal("异常工具类出现异常:"+e);
		}
		return flag;
	}
}
