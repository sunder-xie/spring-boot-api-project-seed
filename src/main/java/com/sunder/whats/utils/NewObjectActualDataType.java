package com.sunder.whats.utils;//package com.sunder.xie.whats.common.utils;
//
//import com.bstek.dorado.data.type.AggregationDataType;
//import com.bstek.dorado.data.type.DataType;
//import com.bstek.dorado.data.type.GenericCustomEntityDataType;
//import com.bstek.dorado.data.type.property.PropertyDef;
//import com.cpic.tom.model.ObjectActual;
//import com.cpic.tom.model.PropertyActual;
//
//import java.util.ArrayList;
//import java.util.Collection;
//import java.util.List;
//import java.util.Map;
//
///**
// * 非标准数据类型ObjectActual的自定义DataType
// * 
// * @author StevenSong
// * 
// */
//public class NewObjectActualDataType extends
//		GenericCustomEntityDataType<ObjectActual> {
//
//	public static final String TOP_OBJECT_ACTUAL_KEY = "$topObjectActual";
//
//	public static final String TOP_ACTUAL_ID = "topActualId";
//	public static final String ACTUAL_ID = "actualId";
//	public static final String META_PATH = "path";
//
//	private static ThreadLocal<ObjectActual> TOP_OBJECT_ACTUAL = new ThreadLocal<ObjectActual>();
//
//	@Override
//	public Object readProperty(ObjectActual objectActual, String property)
//			throws Exception {
//		Object result = null;
//		if (TOP_ACTUAL_ID.equals(property)) {
//			result = objectActual.getTopActualId();
//		} else if (ACTUAL_ID.equals(property)) {
//			result = objectActual.getActualId();
//		} else {
//			PropertyDef propertyDef = getPropertyDef(property);
//			if (propertyDef != null) {
//				String path = property.toUpperCase();
//				DataType dataType = propertyDef.getDataType();
//				if (dataType instanceof com.sunder.xie.whats.utils.NewObjectActualDataType) {// 对象节点
//					result = objectActual.getObjectActualByKind(path);
//				} else if (dataType instanceof AggregationDataType) {// 集合对象节点
//					result = objectActual.getObjectActualListByKind(path);
//				} else {// 属性节点
//					PropertyActual propertyActual = objectActual
//							.getPropertyActualByKind(property.toUpperCase());
//					if (propertyActual != null) {
//						result = propertyActual.getValue();
//					}
//				}
//			}
//		}
//
//		return result;
//	}
//
//	@Override
//	public void writeProperty(ObjectActual objectActual, String property,
//			Object value) throws Exception {
//		// 处理属性类型节点，对象类型节点在内存中不需要处理
//		if (objectActual != null && !TOP_ACTUAL_ID.equals(property)
//				&& !ACTUAL_ID.equals(property)
//				&& !TOP_OBJECT_ACTUAL_KEY.equals(property)) {
//			PropertyActual propertyActual = objectActual
//					.getPropertyActualByKind(property.toUpperCase());
//			if (propertyActual != null) {
//				propertyActual.setValue(value);
//			} else {
//				if (objectActual.canCreateNewPropertyActual(property
//						.toUpperCase())) {
//					propertyActual = objectActual
//							.createNewPropertyActual(property.toUpperCase());
//					propertyActual.setValue(value);
//				} else {// 添加虚拟属性
//
//					if (value instanceof Boolean) {
//						propertyActual = objectActual
//								.createNonModelPropertyActual(
//										property.toUpperCase(), "Boolean");
//					} else {
//						propertyActual = objectActual
//								.createNonModelPropertyActual(property
//										.toUpperCase());
//					}
//
//					propertyActual.setValue(value);
//				}
//			}
//		}
//	}
//
//	@Override
//	protected ObjectActual createDataObject(Map<String, Object> map)
//			throws Exception {
//		ObjectActual objectActual = null;
//		Long actualId = (Long) map.get(ACTUAL_ID);
//		if (actualId != null) {
//			objectActual = loadObjectActualByActualId(map, actualId);
//		}
//		return objectActual;
//	}
//
//	/**
//	 * 获取objectActual
//	 * 
//	 * @param map
//	 * @param actualId
//	 * @return
//	 */
//	private ObjectActual loadObjectActualByActualId(Map<String, Object> map,
//			Long actualId) {
//		ObjectActual objectActual = null;
//		ObjectActual topObjectActual = (ObjectActual) map
//				.get(TOP_OBJECT_ACTUAL_KEY);
//		if (topObjectActual == null) {
//			topObjectActual = TOP_OBJECT_ACTUAL.get();
//			objectActual = topObjectActual.getObjectActualByActualId(actualId);
//		} else {
//			TOP_OBJECT_ACTUAL.set(topObjectActual);
//			objectActual = topObjectActual;
//		}
//		return objectActual;
//
//	}
//
//	@Override
//	protected void writePropertyWithRudeType(ObjectActual objectActual,
//			String property, Object value) throws Exception {
//		DataType dataType = null;
//		PropertyDef propertyDef = getPropertyDef(property);
//		if (propertyDef != null) {
//			dataType = propertyDef.getDataType();
//		}
//		if (dataType != null) {
//			if (dataType instanceof com.sunder.xie.whats.utils.NewObjectActualDataType) {
//				getValueFromObjectActualDataType(objectActual, propertyDef,
//						value);
//			} else if (dataType instanceof AggregationDataType) {
//				getValueFromAggregationDataType(objectActual, propertyDef,
//						value);
//			} else {
//				value = dataType.fromObject(value);
//				writeProperty(objectActual, property, value);
//			}
//		} else {
//			writeProperty(objectActual, property, value);
//		}
//	}
//
//	/**
//	 * 从ObjectActualDataType类型对象取值
//	 * 
//	 * @param objectActual
//	 * @param propertyDef
//	 * @param value
//	 * @return
//	 * @throws Exception
//	 */
//	@SuppressWarnings("unchecked")
//	private Object getValueFromObjectActualDataType(ObjectActual objectActual,
//			PropertyDef propertyDef, Object value) throws Exception {
//		String kind = propertyDef.getName().toUpperCase();
//		ObjectActual childObjectActual = objectActual
//				.getObjectActualByKind(kind);
//		if (value != null) {
//			if (childObjectActual == null) {
//				childObjectActual = objectActual.createNewObjectActual(kind);
//			}
//			Map<String, Object> valueMap = (Map<String, Object>) value;
//			valueMap.put(ACTUAL_ID, childObjectActual.getActualId());
//			return ((com.sunder.xie.whats.utils.NewObjectActualDataType) propertyDef.getDataType())
//					.fromMap(valueMap);
//		} else {
//			if (childObjectActual != null) {
//				childObjectActual.remove();
//			}
//			return null;
//		}
//	}
//
//	/**
//	 * 从AggregationDataType类型对象取值
//	 * 
//	 * @param objectActual
//	 * @param propertyDef
//	 * @param value
//	 * @return
//	 * @throws Exception
//	 */
//	@SuppressWarnings({ "unchecked", "rawtypes" })
//	private Object getValueFromAggregationDataType(ObjectActual objectActual,
//			PropertyDef propertyDef, Object value) throws Exception {
//		AggregationDataType aggregationDataType = (AggregationDataType) propertyDef
//				.getDataType();
//		DataType elementDataType = aggregationDataType.getElementDataType();
//		if (elementDataType instanceof com.sunder.xie.whats.utils.NewObjectActualDataType) {
//			List<Map<String, Object>> valueList = (List<Map<String, Object>>) value;
//			configActualId(objectActual, propertyDef, valueList);
//			if (valueList != null) {
//				Collection newCollection = new ArrayList();
//				for (int i = 0; i < valueList.size(); i++) {
//					Map<String, Object> elementMap = valueList.get(i);
//					newCollection
//							.add(((com.sunder.xie.whats.utils.NewObjectActualDataType) elementDataType)
//									.fromMap(elementMap));
//				}
//				value = newCollection;
//			}
//		}
//		return value;
//	}
//
//	/**
//	 * 为list中每个valueMap配置对应的actualId
//	 * 
//	 * @param objectActual
//	 * @param valueList
//	 */
//	private void configActualId(ObjectActual objectActual,
//			PropertyDef propertyDef, List<Map<String, Object>> valueList) {
//		String kind = propertyDef.getName().toUpperCase();
//		List<ObjectActual> childObjectActualList = objectActual
//				.getObjectActualListByKind(kind);
//		if (valueList != null) {
//			for (Map<String, Object> valueMap : valueList) {
//				Long actualId = (Long) valueMap.get(ACTUAL_ID);
//				ObjectActual childObjectActual = null;
//				if (actualId != null) {
//					childObjectActual = objectActual
//							.getObjectActualByActualId(actualId);
//				}
//				if (childObjectActual != null) {
//					childObjectActualList.remove(childObjectActual);
//				} else {
//					childObjectActual = objectActual
//							.createNewObjectActual(kind);
//					valueMap.put(ACTUAL_ID, childObjectActual.getActualId());
//				}
//			}
//		}
//		for (ObjectActual childObjectActual : childObjectActualList) {
//			childObjectActual.remove();
//		}
//	}
//}