<template>
    <div>
        <Button @click="modal=true">
            <slot>title</slot>
        </Button>

        <Modal v-model="modal" title="数据导出" class="idc-modal-no-footer">
            <p>modal content</p>
        </Modal>
    </div>
</template>
<script>

export default {
    data(){
        return {
            modal: false
        }
    }
}
</script>
