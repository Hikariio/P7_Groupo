<script>
import FormLogin from '@/components/FormLogin.vue';
import FormRegister from '@/components/FormRegister.vue';
import SendMessage from '@/components/SendMessage.vue';
export default({
    components:{
        FormLogin,
        FormRegister,
        SendMessage
    }
})
</script>

<template>
    <div>
      <FormLogin/>
      <FormRegister/>
      <SendMessage/>
    </div>
</template>