package com.sunder.whats.service.impl;

import com.sunder.whats.core.AbstractService;
import com.sunder.whats.mapper.UserMapper;
import com.sunder.whats.model.User;
import com.sunder.whats.service.UserService;
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

}
