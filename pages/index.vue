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
                            <span>
                                {{
                                    formatDate(note.updatedAt)
                                }}
                            </span>
                            <span
                                v-if="note.text.length > 50"
                                class="text-zinc-400"
                            >...{{ note.text.substring(30, 50) }}
                            </span>
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
                            <span
                                v-if="note.text.length > 50"
                                class="text-zinc-400"
                            >...{{ note.text.substring(30, 50) }}
                            </span>
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
                            <span
                                v-if="note.text.length > 50"
                                class="text-zinc-400"
                            >...{{ note.text.substring(30, 50) }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full bg-purple-900 overflow-y-scroll md:overflow-y-auto">
            <div class="text-zinc-300 flex p-8 justify-between items-start">
                <button
                    class="inline-flex gap-3 font-bold
                    text-zinc-3000 hover:text-zinc-50"
                    @click="createNewNote"
                >
                    <Pencil />
                    <span class="mt-0.5 font-h1">Note</span>
                </button>
                <button class="hover:stroke-zinc-50"><TrashIcon /></button>
            </div>

            <div class="text-zinc-200 p-8 max-w-[40%] mx-auto font-bodyTest">
                <div v-if="selectedNote && selectedNote.id">
                    <p class="text-zinc-100 mb-8 text-lg">
                        {{
                            formatDate(selectedNote.updatedAt)
                        }}
                    </p>
                    <textarea
                        ref="textarea"
                        v-model="updatedNote"
                        name="note"
                        id="note"
                        class="text-zinc-100 my-4 bg-transparent rounded-md p-4 -ml-5 border-[0.5px] border-purple-800
                        focus:outline-none focus:bg-[#030303] w-full min-h-[300px] cursor-pointer"
                        @input="() => {
                            debouncedFn()
                            selectedNote.text = updatedNote
                        }"
                    >
                        {{ selectedNote.text }}
                    </textarea>
                </div>
                <div v-else class="text-zinc-400 italic text-center mt-10">
                    Pas de note encore...
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const updatedNote = ref('')
    const notes = ref([])
    const selectedNote = ref({})
    const textarea = ref(null)

    definePageMeta({
        middleware: ['auth'],
    })

    async function createNewNote() {
        try {
            const newNote = await $fetch(`/api/notes`, {
                method: 'POST',
            })

            notes.value.unshift(newNote)
            selectedNote.value = notes.value[0]
            updatedNote.value = ''
            textarea.value.focus()
        } catch (error) {
            console.log('error', error)
        }
    }

    const debouncedFn = useDebounceFn(async() => {
        await updateNote()
    }, 1000)

    async function updateNote() {
        try {
            await $fetch(`/api/notes/${selectedNote.value.id}`, {
                method: 'PATCH',
                body: {
                    updatedNote: updatedNote.value,
                }
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    const todaysNotes = computed(() => {
        return notes.value
            .filter((note) => {
                const noteDate = new Date(note.updatedAt)
                return noteDate
                    .toDateString() === new Date()
                    .toDateString()
            })
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
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
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
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

        if (notes.value.length > 0) {
            selectedNote.value = notes.value.slice().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0]
            updatedNote.value = selectedNote.value.text
        }

        textarea.value.focus()
    })

    watch(selectedNote, (newNote) => {
        updatedNote.value = newNote?.text || ''
    })

    function formatDate(dateStr) {
        const date = new Date(dateStr)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${day}/${month}/${year}`
    }
</script>