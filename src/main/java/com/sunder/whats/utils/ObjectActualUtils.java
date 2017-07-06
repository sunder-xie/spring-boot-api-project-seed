package com.sunder.whats.utils;//package com.sunder.xie.whats.common.utils;
//
//import com.cpic.caf.core.exception.BusinessException;
//import com.cpic.caf.core.utils.StringUtil;
//import com.cpic.tom.model.ObjectActual;
//import com.cpic.tom.model.PropertyActual;
//
//import java.util.List;
//import java.util.Map;
//
//public abstract class ObjectActualUtils {
//	
//	/**
//	 * 功能：将orig的数据全复制到dest里，原来dest里的数据会被覆盖
//	 * 前提条件：orig和dest必须是结构一致的
//	 * @param orig
//	 * @param dest
//	 */
//	/*public static void copyData(ObjectActual orig, ObjectActual dest){
//		//将orig的属性赋值到dest
//		dest.setPropertyValues(orig.getPropertyValues());
//		Map<String, List<ObjectActual>> subObjectActuals = orig.getObjectActuals();
//		
//		for(Entry<String, List<ObjectActual>> entry : subObjectActuals.entrySet()){//如果存在子ObjectActual列表，那么循环处理ObjectActual，递归调用copyData
//			String subObjectActualName = entry.getKey();
//			List<ObjectActual> origSubObjectActualValue = entry.getValue();
//			List<ObjectActual> destSubObjectActualValue = dest.getObjectActualListByKind(subObjectActualName);
//			int origSubObjectSize = origSubObjectActualValue.size();
//			int destSubObjectSize = destSubObjectActualValue.size();
//			
//			if(destSubObjectSize > origSubObjectSize){//若dest的某个子对象数多于orig，那么先将dest里的多出部分先移除，使两边数目一致
//				for(int i = destSubObjectSize - 1 ; i >= origSubObjectSize ; i -- ){
//					destSubObjectActualValue.get(i).remove();
//				}
//			}
//			for(int i = 0; i < origSubObjectSize; i ++ ){
//				if( i < destSubObjectSize){
//					copyData(origSubObjectActualValue.get(i), destSubObjectActualValue.get(i));//赋值子对象属性
//				}else{//若orig的某个子对象数多于dest，那么先创建新的，再赋值
//					ObjectActual newSubObjectActual = dest.createNewObjectActual(subObjectActualName);
//					copyData(origSubObjectActualValue.get(i), newSubObjectActual);
//				}
//			}
//		}
//	}*/
//	
//	
//	/**
//	 * 将源对象节点的值同步到目标对象节点上，同步后目标对象节点的信息包含目标对象
//	 * @param source
//	 * @param destination
//	 * @param ifCopyBlank property的值为空值时，是否需要copy
//	 */
//	public static void synchronizeObjectActual(ObjectActual source, ObjectActual destination ,boolean ifCopyBlank) {
//		if (!source.getKind().equals(destination.getKind())) {
//			throw new BusinessException("synchronizeObjectActual_Kind_Not_Equal");
//		}
//		
//		synchronizeFirstLevelPropertyActual(source, destination,ifCopyBlank);
//		synchronizeFirstLevelObjectActual(source, destination);
//	}
//	
//	
//	/**
//	 * 将源对象节点的值同步到目标对象节点上，同步后目标对象节点的信息包含目标对象
//	 * @param source
//	 * @param destination
//	 */
//	public static void synchronizeObjectActual(ObjectActual source, ObjectActual destination) {
//		if (!source.getKind().equals(destination.getKind())) {
//			throw new BusinessException("synchronizeObjectActual_Kind_Not_Equal");
//		}
//		
//		synchronizeFirstLevelPropertyActual(source, destination,true);
//		synchronizeFirstLevelObjectActual(source, destination);
//	}
//
//	private static void synchronizeFirstLevelObjectActual(ObjectActual source,
//			ObjectActual destination) {
//		for (Map.Entry<String, List<ObjectActual>> entry : source.getObjectActuals().entrySet()) {
//			List<ObjectActual> destinationChildActuals = destination.getObjectActualListByKind(entry.getKey());
//			int origSubObjectSize = entry.getValue().size();
//			int destSubObjectSize = destinationChildActuals.size();
//			if (destinationChildActuals.size() <  entry.getValue().size()) {
//				for (int i=0; i< (entry.getValue().size() - destinationChildActuals.size()); i++) {
//					destination.createNewObjectActual(entry.getKey());
//				}
//			} else if (destinationChildActuals.size() >  entry.getValue().size()) { 
//				// 目标对象节点多余源时，先删除
//				for(int i = origSubObjectSize; i < destSubObjectSize ; i ++ ){
//					destinationChildActuals.get(i).remove();
//				}
//			}
//			destinationChildActuals = destination.getObjectActualListByKind(entry.getKey());
//			for (int i=0; i<entry.getValue().size(); i++) {
//				synchronizeObjectActual(entry.getValue().get(i), destinationChildActuals.get(i));
//			}
//		}
//	}
//
//	private static void synchronizeFirstLevelPropertyActual(
//			ObjectActual source, ObjectActual destination,boolean ifCopyBlank) {
//		for (Map.Entry<String, PropertyActual> entry : source.getProperties().entrySet()) {
//            if (entry.getValue().isNonModelProperty()) {
//                continue;
//            }
//			if (destination.getPropertyActualByKind(entry.getKey()) == null) {
//				destination.createNewPropertyActual(entry.getKey());
//			}			
//			
//				if(!StringUtil.isBlank(entry.getValue().getStringValue())){
//					
//					destination.setPropertyValueByKind(entry.getKey(), entry.getValue().getValue());
//				
//				}else if(ifCopyBlank){
//					
//					destination.setPropertyValueByKind(entry.getKey(), entry.getValue().getValue());
//				}
//		}
//	}
//}