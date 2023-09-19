<template>
    <div class="wrap">
        <div class="form">
            <h2>系统登录</h2>
            <el-form ref="ruleFormRef" :model="user" :rules="rules" class="demo-ruleForm" status-icon>
                <el-form-item prop="username">
                    <el-input v-model="user.username" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="user.password" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="user.code" class="code" placeholder="请输入验证码" />

                    <img :src="(imgUrl as string)" style="height: 40px;width: 122px; margin-left: 10px;" @click="getCodeFn">
                </el-form-item>
                <el-form-item>
                    <div class="btnbox">
                        <el-button block size="large" type="primary" @click="submitForm(ruleFormRef)">
                            登录
                        </el-button>
                        <el-button block size="large" type="danger" plain @click="resetForm(ruleFormRef)">还原数据</el-button>
                    </div>
                </el-form-item>
            </el-form>
            <p><span>温馨提示：</span>账号无法登录的时候，请点击【还原数据按钮】</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { getCode, login } from "../api/login";
import { type FormInstance, type FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
// import { useMain } from "../store/home.ts";

const user = reactive({
    username: 'admin',
    password: '1234',
    code: ''
})
const router = useRouter()
interface user {
    username: string,
    password: string,
    code: string
}

const ruleFormRef = ref<FormInstance>()
const imgUrl = ref<string | null>(null)
const rules = reactive<FormRules<user>>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    code: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
    ],
})

// 登录
const submitForm = async (formEl: FormInstance | undefined) => {


    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            login(user).then(res => {
                console.log(res.data);
                if (res.data.code === 200) {

                    ElMessage.success('登录成功')
                    localStorage.setItem('token', res.data.token)
                    sessionStorage.setItem('info', res.data)


                    router.push('/')
                } else {
                    console.log(456)
                    ElMessage.error(res.data.msg)
                }
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const getCodeFn = () => {
    getCode().then(res => {
        console.log(res);
        imgUrl.value = 'data:image/png;base64,' + btoa(
            new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
    })
}

onMounted(() => {
    getCodeFn()
})

</script>


<style lang="scss" scoped>
.wrap {
    width: 100%;
    height: 100%;
    position: relative;

    .form {
        width: 470px;
        height: 360px;
        padding: 25px;
        box-shadow: 0 0 30px 10px #ddd;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 8px;

        h2 {
            text-align: center;
            height: 40px;
            line-height: 40px;
        }

        .btnbox {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .el-button {
                flex: 1;
            }
        }

        .code {
            width: 65%;
        }

        p {
            color: red;
            font-size: 12px;

            span {
                font-size: 14px;
                color: #000;
            }
        }
    }
}
</style>