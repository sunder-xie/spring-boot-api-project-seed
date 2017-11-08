package ${basePackage}.web.controller.${modelNameUpperCamel};

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * ${author}
 * on ${date}.
 */
@RestController
@RequestMapping("${baseRequestMapping}")
public class ${modelNameUpperCamel}Controller {
   @Autowired
    private ${modelNameUpperCamel}Service ${modelNameLowerCamel}Service;

    @PostMapping("/add")
    public ResultCode<${modelNameUpperCamel}> add(${modelNameUpperCamel} ${modelNameLowerCamel}) {
        ${modelNameLowerCamel}Service.save(${modelNameLowerCamel});
        return ResultCode.getSuccessReturn(${modelNameLowerCamel});
}

    @PostMapping("/delete")
    public ResultCode<${modelNameUpperCamel}> delete(Integer id) {
        ${modelNameLowerCamel}Service.deleteById(id);
        return ResultCode.getSuccessReturn(${modelNameLowerCamel});
}

    @PostMapping("/update")
    public ResultCode<${modelNameUpperCamel}> update(${modelNameUpperCamel} ${modelNameLowerCamel}) {
        ${modelNameLowerCamel}Service.update(${modelNameLowerCamel});
        return ResultCode.getSuccessReturn(${modelNameLowerCamel});
    }

    @PostMapping("/detail")
    public ResultCode<${modelNameUpperCamel}> detail(Integer id) {
        ${modelNameUpperCamel} ${modelNameLowerCamel} = ${modelNameLowerCamel}Service.findById(id);
        return ResultCode.getSuccessReturn(${modelNameLowerCamel});
    }

    @PostMapping("/list")
    public ResultCode<PageInfo> list(Integer page, Integer size) {
        PageHelper.startPage(page, size);
        List<${modelNameUpperCamel}> list = ${modelNameLowerCamel}Service.findAll();
        PageInfo pageInfo = new PageInfo(list);
        return ResultCode.getSuccessReturn(pageInfo);
    }
}
