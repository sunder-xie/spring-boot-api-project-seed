package com.sunder.whats.service.user;

import com.sunder.whats.core.IService;
import com.sunder.whats.core.Result;
import com.sunder.whats.entity.User;


/**
 * Created by CodeGenerator on 2017/06/30.
 */
public interface UserService extends IService<User> {

    /**
     * 通过用户名和密码查询登录用户
     * @param user
     * @return
     */
    Result loginByPwd(User user);
}
