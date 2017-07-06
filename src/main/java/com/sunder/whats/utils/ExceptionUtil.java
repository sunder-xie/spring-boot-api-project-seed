package com.sunder.whats.utils;

import com.cpic.caf.core.exception.BusinessException;

/**
 * Created by zhaoguoqiang-003 on 14-7-1.
 */
public class ExceptionUtil {

    public static void handleOracle12899Exception(RuntimeException ex) {
        if (getExceptionRootCause(ex).getMessage().contains("ORA-12899")) {
            throw new BusinessException("输入的字段信息超过字段定义的最大长度限制，请检查。");
        }
        throw ex;
    }

    private static Throwable getExceptionRootCause(Throwable ex) {
        if (ex.getCause() == null) {
            return ex;
        } else {
            return getExceptionRootCause(ex.getCause());
        }
    }

}
