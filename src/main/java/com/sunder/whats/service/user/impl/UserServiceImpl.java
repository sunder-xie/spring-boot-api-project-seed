package com.sunder.whats.service.user.impl;

import com.sunder.whats.core.AbstractService;
import com.sunder.whats.core.Result;
import com.sunder.whats.core.ResultGenerator;
import com.sunder.whats.mapper.user.UserMapper;
import com.sunder.whats.entity.User;
import com.sunder.whats.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by CodeGenerator on 2017/06/30.
 */
@Service
@Transactional
public class UserServiceImpl extends AbstractService<User> implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public Result loginByPwd(User user) { //TODO demo 没有进行任务加密和校验
        User selectOne = userMapper.selectOne(user);
        return ResultGenerator.genSuccessResult(selectOne);
    }
}
