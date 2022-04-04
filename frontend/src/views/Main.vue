<template>
    <div>
        <Header/>
        <SendMessage/>
        <ListeMessage/>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import SendMessage from '@/components/SendMessage.vue'
import ListeMessage from '@/components/ListeMessage.vue'
export default({
    components: {
        Header,
        SendMessage,
        ListeMessage
    }
})
</script>

<style scoped>
div{
    width: 100%;
    overflow: hidden;
}
/*=============================================
                    TABLET
=============================================*/
@media only screen and (min-width : 768px) {
}
/*=============================================
                    DESKTOP
=============================================*/
@media only screen and (min-width : 1224px) {
}
</style>