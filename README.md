# student-web
B语言诞生于1969年，由Kenneth Lane Thompson和Dennis MacAlistair Ritchie创建  
C语言诞生于1972年，由Kenneth Lane Thompson和Dennis MacAlistair Ritchie创建  
JS诞生于1995年，由Brendan Eich创建。
```html
<!-- input输入框内集成select选项 -->
<div id="register_username_border" class="form-group has-feedback">
    <div class="input-group">
        <label for="register_username" class="control-label sr-only">registerUsername</label>
        <input id="register_username" type="text" class="form-control" name="register_username" placeholder="真实姓名" onblur="checkRegisterUsername()">
        <div class="input-group-btn">
            <select name="sex" class="form-control" style="width: auto;">
                <option value="MALE">男</option>
                <option value="FEMALE">女</option>
            </select>
        </div>
    </div>
</div>
```

