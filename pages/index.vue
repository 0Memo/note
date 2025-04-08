<template>
    <div class="h-screen bg-[#1c044f] flex">
        <div class="bg-[#030303] md:w-[338px] p-8 overflow-y-scroll md:overflow-y-auto">
            <Logo />

            <p class="text-md font-semibold text-zinc-200 mt-10 font-h1">Aujourd'hui</p>
            <div class="text-zinc-200 mt-10 ml-2 text-sm font-bodyTest">
                <div class="bg-[#581C87] rounded-lg p-4">
                    <h3 class="font-bold">Je viens tout juste de...</h3>
                    <div class="space-x-4">
                        <span>Aujourd'hui</span>
                        <span class="text-zinc-400">Bibliothèque...</span>
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="font-bold">Je viens tout juste de...</h3>
                    <div class="space-x-8">
                        <span>Aujourd'hui</span>
                        <span class="text-zinc-400">Appel...</span>
                    </div>
                </div>
            </div>

            <p class="text-md font-semibold text-zinc-200 mt-10 font-h1">Hier</p>
            <div class="text-zinc-200 mt-10 ml-4 text-sm font-bodyTest">
                <div class="p-4">
                    <h3 class="font-bold">Je viens tout juste de...</h3>
                    <div class="space-x-4">
                        <span>Hier</span>
                        <span class="text-zinc-400">Bibliothèque...</span>
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="font-bold">Je viens tout juste de...</h3>
                    <div class="space-x-4">
                        <span>Hier</span>
                        <span class="text-zinc-400">Appel...</span>
                    </div>
                </div>
            </div>

            <p class="text-md font-semibold text-zinc-200 mt-10 font-h1">30 jours préc.</p>
            <div class="text-zinc-200 mt-10 ml-4 text-sm font-bodyTest">
                <div class="p-4">
                    <h3 class="font-bold">Je viens tout juste de...</h3>
                    <div class="space-x-4">
                        <span>03/02/2025</span>
                        <span class="text-zinc-400">Bibliothèque...</span>
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="font-bold">Je viens tout juste de...</h3>
                    <div class="space-x-4">
                        <span>02/02/2025</span>
                        <span class="text-zinc-400">Appel...</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full bg-purple-900 overflow-y-scroll md:overflow-y-auto">
            <div class="text-zinc-300 flex p-8 justify-between items-start">
                <button class="inline-flex gap-3 font-bold text-zinc-3000 hover:text-zinc-50">
                    <Pencil />
                    <span class="mt-0.5 font-h1">Note</span>
                </button>
                <button class="hover:stroke-zinc-50"><TrashIcon /></button>
            </div>

            <div class="text-zinc-200 p-8 max-w-[40%] mx-auto font-bodyTest">
                <p class="text-zinc-100 mb-8 text-lg">8 avril 2025</p>
                <p class="text-zinc-100 my-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <p class="text-zinc-100 my-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <p class="text-zinc-100">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: ['auth'],
    })
</script>