<template lang="">
    <div class="text-white">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle class="spinner_S1WN" cx="4" cy="12" r="3" />
                <circle class="spinner_S1WN spinner_Km9P" cx="12" cy="12" r="3" />
                <circle class="spinner_S1WN spinner_JApP" cx="20" cy="12" r="3" />
            </svg>
    </div>
</template>
<script>
export default {

}
</script>
<style>
.spinner_S1WN {
    animation: spinner_MGfb .8s linear infinite;
    animation-delay: -.8s
}

.spinner_Km9P {
    animation-delay: -.65s
}

.spinner_JApP {
    animation-delay: -.5s
}

@keyframes spinner_MGfb {

    93.75%,
    100% {
        opacity: .2
    }
}
</style>