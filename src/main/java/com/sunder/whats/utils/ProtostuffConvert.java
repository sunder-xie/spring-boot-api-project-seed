package com.sunder.whats.utils;



import com.dyuproject.protostuff.LinkedBuffer;
import com.dyuproject.protostuff.ProtostuffIOUtil;
import com.dyuproject.protostuff.runtime.RuntimeSchema;
import com.sunder.xie.whats.common.pojo.DubboxResult;

/**
 *  序列化和反序列化工具
 *  使用方法见 main方法
 * @author  zsj
 *
 * @param <T>
 */
public class ProtostuffConvert<T> {
	public RuntimeSchema schema;
	private T data;
	public ProtostuffConvert(T data) {
		this.data = data;
		schema =  RuntimeSchema.createFrom(data.getClass());
	}
	public ProtostuffConvert(Class calzz) {
		
		schema = RuntimeSchema.createFrom(calzz);
	}
	public RuntimeSchema getSchema() {
		return schema;
	}

	public void setSchema(RuntimeSchema schema) {
		this.schema = schema;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	// 序列化
	public byte[] convert(T source) {
		byte[] bytes = ProtostuffIOUtil.toByteArray(source, schema,
				LinkedBuffer.allocate(LinkedBuffer.DEFAULT_BUFFER_SIZE));
		return bytes;
	}

	// 反序列化
	public T convert(byte[] source) {
		data = (T) schema.newMessage();
		ProtostuffIOUtil.mergeFrom(source, data, schema);
		return data;

	}

	public static void main(String[] args) {
		DubboxResult activity = new DubboxResult();
		ProtostuffConvert<DubboxResult> aConvert = new ProtostuffConvert<DubboxResult>(DubboxResult.class);
		ProtostuffConvert<DubboxResult> aConvert1 = new ProtostuffConvert<DubboxResult>(activity);
		 activity.setMsg("ddddddd");
		byte[] bs = aConvert.convert(activity);
		activity = aConvert.convert(bs);
		System.out.println(activity.getMsg());
		System.out.println(activity.getMsg());
	}

}
