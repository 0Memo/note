<template>
    <div class="h-screen bg-[#1c044f] flex">
        <div class="bg-[#030303] md:w-[338px] p-8 overflow-y-scroll md:overflow-y-auto">
            <Logo />

            <div>
                <p class="text-md font-semibold text-zinc-200 mt-10 font-h1">Aujourd'hui</p>
                <div class="text-zinc-200 mt-10 ml-2 space-y-2 text-sm font-bodyTest">
                    <div
                        v-for="note in todaysNotes"
                        class="rounded-lg p-4 cursor-pointer"
                        :class="{
                            'bg-[#581C87]' : note.id === selectedNote.id,
                            'hover:bg-[#581C87]/50' : note.id !== selectedNote.id,
                        }"
                        @click="selectedNote = note"
                    >
                        <h3 class="font-bold truncate">{{ note.text.substring(0, 30) }}</h3>
                        <div class="space-x-4 truncate">
                            <span>{{
                                    new Date(note.updatedAt).toDateString() === 
                                    new Date().toDateString()
                                        ? "Aujourd'hui"
                                        : formatDate(note.updatedAt)
                                }}</span>
                            <span class="text-zinc-400">...{{ note.text.substring(30, 50) }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <p class="text-md font-semibold text-zinc-200 mt-10 font-h1">Hier</p>
                <div class="text-zinc-200 mt-10 ml-2 space-y-2 text-sm font-bodyTest">
                    <div
                        v-for="note in yesterdaysNotes"
                        class="rounded-lg p-4 cursor-pointer"
                        :class="{
                            'bg-[#581C87]' : note.id === selectedNote.id,
                            'hover:bg-[#581C87]/50' : note.id !== selectedNote.id,
                        }"
                        @click="selectedNote = note"
                    >
                        <h3 class="font-bold truncate">{{ note.text.substring(0, 30) }}</h3>
                        <div class="space-x-4 truncate">
                            <span>{{
                                    new Date(note.updatedAt).toDateString() === 
                                    new Date().toDateString()
                                        ? "Aujourd'hui"
                                        : formatDate(note.updatedAt)
                                }}</span>
                            <span class="text-zinc-400">...{{ note.text.substring(30, 50) }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <p class="text-md font-semibold text-zinc-200 mt-10 font-h1">préc.</p>
                <div class="text-zinc-200 mt-10 ml-2 space-y-2 text-sm font-bodyTest">
                    <div
                        v-for="note in earlierNotes"
                        class="rounded-lg p-4 cursor-pointer"
                        :class="{
                            'bg-[#581C87]' : note.id === selectedNote.id,
                            'hover:bg-[#581C87]/50' : note.id !== selectedNote.id,
                        }"
                        @click="selectedNote = note"
                    >
                        <h3 class="font-bold truncate">{{ note.text.substring(0, 30) }}</h3>
                        <div class="space-x-4 truncate">
                            <span>{{
                                    new Date(note.updatedAt).toDateString() === 
                                    new Date().toDateString()
                                        ? "Aujourd'hui"
                                        : formatDate(note.updatedAt)
                                }}</span>
                            <span class="text-zinc-400">...{{ note.text.substring(30, 50) }}</span>
                        </div>
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
                <p class="text-zinc-100 mb-8 text-lg">
                    {{
                        new Date(selectedNote.updatedAt).toDateString() === 
                        new Date().toDateString()
                            ? "Aujourd'hui"
                            : formatDate(selectedNote.updatedAt)
                    }}
                </p>
                <p class="text-zinc-100 my-4">
                    {{ selectedNote.text }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
    const notes = ref([])
    const selectedNote = ref({})

    definePageMeta({
        middleware: ['auth'],
    })

    const todaysNotes = computed(() => {
        return notes.value
            .filter((note) => {
                const noteDate = new Date(note.updatedAt)
                return noteDate
                    .toDateString() === new Date()
                    .toDateString()
            })
    })

    const yesterdaysNotes = computed(() => {
        const yesterday = new Date()
        yesterday.
            setDate(yesterday.getDate() - 1)
        return notes.value
            .filter((note) => {
                const noteDate = new Date(note.updatedAt)
                return noteDate
                        .toDateString() === yesterday
                        .toDateString()
            })
    })

    const earlierNotes = computed(() => {
        const yesterday = new Date()
        yesterday
            .setDate(yesterday.getDate() - 1)
        
        return notes.value
            .filter((note) => {
                const noteDate = new Date(note.updatedAt)
                return (
                    noteDate < yesterday &&
                    noteDate
                        .toDateString() !== yesterday.toDateString()
                )
            })
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) 
    })

    onMounted(async() => {
        notes.value = await $fetch('/api/notes')

        if(notes.value.length > 0) selectedNote.value = notes.value[0]
    })

    function formatDate(dateStr) {
        const date = new Date(dateStr)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${day}/${month}/${year}`
    }
</script>