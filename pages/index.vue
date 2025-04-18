<template>
    <div class="h-screen bg-[#1c044f] flex">
        <div
            class="md:hidden fixed top-0 left-0 right-0 z-[100] bg-[#581C87] flex items-center justify-between px-6 py-4 shadow-md cursor-pointer"
            @click="toggleSidebar"
        >
            <ClickLogo />
            <NavbarLogo />
        </div>
        <!-- Mobile + Desktop Sidebar -->
        <div
            class="fixed md:static top-0 left-0 z-50 h-full md:h-auto w-72 md:w-[338px] bg-[#030303] p-8 overflow-y-scroll md:overflow-y-auto transition-transform duration-300"
            :class="{
                'translate-x-0': sidebarOpen || isDesktop,
                '-translate-x-full md:translate-x-0': !sidebarOpen && !isDesktop,
                'bg-[#030303]/95 backdrop-blur-md': !isDesktop, // translucent overlay look
            }"
        >
            <Logo @click="toggleSidebar" class="cursor-pointer" />

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
                        @click="handleNoteClick(note)"
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
                        @click="handleNoteClick(note)"
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
                        @click="handleNoteClick(note)"
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
            <div class="text-zinc-300 flex p-8 justify-between items-start mt-16 md:mt-0">
                <button
                    class="inline-flex gap-3 font-bold
                    text-zinc-3000 hover:text-zinc-50"
                    @click="createNewNote"
                >
                    <Pencil />
                </button>
                <ConfirmModal
                    :visible="showConfirmModal"
                    title="Suppression définitive"
                    message="Confirmer ?"
                    @confirm="handleConfirmDelete"
                    @cancel="showConfirmModal = false"
                />
                <button
                    class="hover:stroke-zinc-50"
                    @click="showConfirmModal = true"
                >
                    <TrashIcon />
                </button>
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
                        placeholder="Veuillez saisir votre texte ici..."
                        class="text-zinc-100 my-4 bg-transparent rounded-md p-4 -ml-36 md:-ml-5 border-[0.5px] border-purple-800
                        focus:outline-none focus:bg-[#030303] w-96 md:w-full min-h-[300px] cursor-pointer"
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
            <button
                class="text-zinc-300 text-sm
                font-bold absolute right-0 bottom-0 p-8"
                @click="logout"
            >
                <Logout class="hover:text-zinc-50" />
            </button>
        </div>
    </div>
</template>

<script setup>
    import ConfirmModal from '@/components/ConfirmModal.vue'
    import { nextTick } from 'vue'

    const updatedNote = ref('')
    const notes = ref([])
    const selectedNote = ref({})
    const textarea = ref(null)
    const sidebarOpen = ref(false)
    const isDesktop = ref(false)
    import { useToast } from 'vue-toast-notification'

    const $toast = useToast()
    const showConfirmModal = ref(false)

    definePageMeta({
        middleware: ['auth'],
    })

    function logout() {
        const jwtCookie = useCookie('NoteJWT')
        jwtCookie.value = null
        navigateTo('/login')
    }

    const handleConfirmDelete = async () => {
        showConfirmModal.value = false
        try {
            await $fetch(`/api/notes/${selectedNote.value.id}`, {
                method: 'DELETE',
            })

            notes.value = notes.value.filter(n => n.id !== selectedNote.value.id)
            selectedNote.value = notes.value[0] || {}
            updatedNote.value = selectedNote.value?.text || ''
            $toast.success("Note supprimée avec succès.")
        } catch (error) {
            console.error("Erreur suppression:", error)
            $toast.error("Erreur lors de la suppression.")
        }
    }

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
        updateScreenSize()
        window.addEventListener('resize', updateScreenSize)

        notes.value = await $fetch('/api/notes')

        if (notes.value.length > 0) {
            selectedNote.value = notes.value.slice().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0]
            updatedNote.value = selectedNote.value.text
        }

        nextTick(() => {
            if (textarea.value) {
                textarea.value.focus()
            }
        })
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

    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateScreenSize)
    })

    function updateScreenSize() {
        isDesktop.value = window.innerWidth >= 768 // md breakpoint
        if (isDesktop.value) sidebarOpen.value = false // reset sidebar toggle on desktop
    }

    function toggleSidebar() {
        sidebarOpen.value = !sidebarOpen.value
    }

    function handleNoteClick(note) {
        selectedNote.value = note
        updatedNote.value = note.text
        if (!isDesktop.value) sidebarOpen.value = false
    }
</script>