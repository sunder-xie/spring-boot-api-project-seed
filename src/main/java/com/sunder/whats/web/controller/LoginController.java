package com.sunder.whats.web.controller;

import com.sunder.whats.core.Result;
import com.sunder.whats.core.ResultCode;
import com.sunder.whats.model.User;
import com.sunder.whats.service.UserService;
import com.sunder.whats.web.controller.constant.PageEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by sunder on 2017/7/6.
 */
@Controller
@RequestMapping("login")
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping
    public String loginByPwd(User user) {
        Result result = userService.loginByPwd(user);
        if (null != null && result.getCode() == ResultCode.SUCCESS.code) {
            return PageEnum.INDEX.getValue();
        }
        return PageEnum.LOGIN.getValue();
    }

}
