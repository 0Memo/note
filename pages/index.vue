<template>
    <div class="h-screen bg-[#1c044f] flex">
        <ClientOnly>
            <MouseTrail />
        </ClientOnly>
        <!-- Easter 
        <div class="absolute inset-0 pointer-events-none z-[1]">
            <Easter />
        </div>-->
        <div
            class="md:hidden fixed top-0 left-0 right-0 z-[100] bg-[#581C87] flex items-center justify-between px-6 py-4 shadow-md cursor-pointer"
            @click="toggleSidebar"
        >
            <ClickLogo />
            <NavbarLogo />
        </div>
        <!-- Mobile + Desktop Sidebar -->
        <div
            class="fixed md:static top-0 w-full left-0 z-50 h-full md:h-auto md:w-[338px] bg-[#030303] p-8 overflow-y-scroll md:overflow-y-auto transition-transform duration-300"
            :class="{
                'translate-x-0': sidebarOpen || isDesktop,
                '-translate-x-full md:translate-x-0': !sidebarOpen && !isDesktop,
                'bg-[#030303]/95 backdrop-blur-md': !isDesktop, // translucent overlay look
            }"
        >
            <Logo @click="toggleSidebar" class="cursor-pointer" />
            <div class="text-white flex flex-wrap justify-center gap-2 mt-8 md:mt-6">
                <button @click="changeLocale('en')">
                    <img
                        src="https://flagcdn.com/w20/us.png"
                        srcset="https://flagcdn.com/w40/us.png 2x"
                        width="20"
                        height="13"
                        alt="United States"
                    >
                </button>
                <button @click="changeLocale('es')">
                    <img
                        src="https://flagcdn.com/w20/es.png"
                        srcset="https://flagcdn.com/w40/es.png 2x"
                        width="20"
                        height="13"
                        alt="Spain"
                    >
                </button>
                <button @click="changeLocale('fr')">
                    <img
                        src="https://flagcdn.com/w20/fr.png"
                        srcset="https://flagcdn.com/w40/fr.png 2x"
                        width="20"
                        height="13"
                        alt="France"
                    >
                </button>
                <button @click="changeLocale('it')">
                    <img
                        src="https://flagcdn.com/w20/it.png"
                        srcset="https://flagcdn.com/w40/it.png 2x"
                        width="20"
                        height="13"
                        alt="Italy"
                    >
                </button>
                <button @click="changeLocale('pt')">
                    <img
                        src="https://flagcdn.com/w20/br.png"
                        srcset="https://flagcdn.com/w40/br.png 2x"
                        width="20"
                        height="13"
                        alt="Brazil"
                    >
                </button>
                <button @click="changeLocale('ro')">
                    <img
                        src="https://flagcdn.com/w20/ro.png"
                        srcset="https://flagcdn.com/w40/ro.png 2x"
                        width="20"
                        height="13"
                        alt="Romania"
                    >
                </button>
                <button @click="changeLocale('sv')">
                    <img
                        src="https://flagcdn.com/w20/se.png"
                        srcset="https://flagcdn.com/w40/se.png 2x"
                        width="20"
                        height="13"
                        alt="Sweden"
                    >
                </button>
            </div>

            <template v-if="isLoading">
                <!-- Show a few skeleton loaders -->
                <div class="space-y-10 my-10">
                    <div v-for="n in 3" :key="n" class="space-y-4">
                        <div class="text-skeleton"></div>
                        <div class="note-skeleton"></div>
                    </div>
                </div>
            </template>

            <template v-else>
                <div
                    class="notes-container max-h-[500px] overflow-y-auto"
                    ref="notesContainer"
                    @touchstart="handleTouchStartY"
                    @touchmove="handleTouchMoveY"
                    @touchend="handleTouchEndY"
                >
                    <div>
                        <p class="text-md font-semibold text-zinc-200 mt-10 font-h1">{{ $t('notes.today') }}</p>
                        <div class="text-zinc-200 mt-10 ml-2 space-y-2 text-sm font-bodyTest">
                            <div
                                v-for="note in todaysNotes"
                                :key="note.id"
                                class="relative overflow-hidden"
                            >
                                <!-- Swipeable note container -->
                                <div
                                    class="rounded-lg p-4 cursor-pointer transition-transform duration-300"
                                    :class="{
                                        'bg-[#581C87]': note.id === selectedNote.id,
                                        'hover:bg-[#581C87]/50': note.id !== selectedNote.id,
                                        'transform translate-x-[-70px]': swipedNoteId === note.id && !isDesktop,
                                    }"
                                    @click="handleNoteClick(note)"
                                    @touchstart="handleTouchStart($event, note.id)"
                                    @touchmove="handleTouchMove($event, note.id)"
                                    @touchend="handleTouchEnd(note.id)"
                                >
                                    <h3 class="font-bold truncate">{{ note.text.substring(0, 30) }}</h3>
                                    <div class="space-x-4 truncate">
                                        <span>
                                            {{ formatDate(note.updatedAt) }}
                                        </span>
                                        <span
                                            v-if="note.text.length > 50"
                                            class="text-zinc-400"
                                        >...{{ note.text.substring(30, 50) }}
                                        </span>
                                    </div>
                                </div>
                                
                                <!-- Delete button revealed on swipe - ONLY on mobile -->
                                <div 
                                    v-if="!isDesktop && swipedNoteId === note.id"
                                    class="absolute top-0 right-0 bottom-0 w-[70px] bg-red-600 flex items-center justify-center"
                                    @click.stop="confirmDeleteNote(note)"
                                >
                                    <TrashIcon class="text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <p class="text-md font-semibold text-zinc-200 mt-10 font-h1">{{ $t('notes.yesterday') }}</p>
                        <div class="text-zinc-200 mt-10 ml-2 space-y-2 text-sm font-bodyTest">
                            <div
                                v-for="note in yesterdaysNotes"
                                :key="note.id"
                                class="relative overflow-hidden"
                            >
                                <!-- Swipeable note container -->
                                <div
                                    class="rounded-lg p-4 cursor-pointer transition-transform duration-300"
                                    :class="{
                                        'bg-[#581C87]': note.id === selectedNote.id,
                                        'hover:bg-[#581C87]/50': note.id !== selectedNote.id,
                                        'transform translate-x-[-70px]': swipedNoteId === note.id && !isDesktop,
                                    }"
                                    @click="handleNoteClick(note)"
                                    @touchstart="handleTouchStart($event, note.id)"
                                    @touchmove="handleTouchMove($event, note.id)"
                                    @touchend="handleTouchEnd(note.id)"
                                >
                                    <h3 class="font-bold truncate">{{ note.text.substring(0, 30) }}</h3>
                                    <div class="space-x-4 truncate">
                                        <span>{{ formatDate(note.updatedAt) }}</span>
                                        <span
                                            v-if="note.text.length > 50"
                                            class="text-zinc-400"
                                        >...{{ note.text.substring(30, 50) }}
                                        </span>
                                    </div>
                                </div>
                                
                                <!-- Delete button revealed on swipe - ONLY on mobile -->
                                <div 
                                    v-if="!isDesktop && swipedNoteId === note.id"
                                    class="absolute top-0 right-0 bottom-0 w-[70px] bg-red-600 flex items-center justify-center"
                                    @click.stop="confirmDeleteNote(note)"
                                >
                                    <TrashIcon class="text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <p class="text-md font-semibold text-zinc-200 mt-10 font-h1">{{ $t('notes.previous') }}</p>
                        <div class="text-zinc-200 mt-10 ml-2 space-y-2 text-sm font-bodyTest">
                            <div
                                v-for="note in earlierNotes"
                                :key="note.id"
                                class="relative overflow-hidden"
                            >
                                <!-- Swipeable note container -->
                                <div
                                    class="rounded-lg p-4 cursor-pointer transition-transform duration-300"
                                    :class="{
                                        'bg-[#581C87]': note.id === selectedNote.id,
                                        'hover:bg-[#581C87]/50': note.id !== selectedNote.id,
                                        'transform translate-x-[-70px]': swipedNoteId === note.id && !isDesktop,
                                    }"
                                    @click="handleNoteClick(note)"
                                    @touchstart="handleTouchStart($event, note.id)"
                                    @touchmove="handleTouchMove($event, note.id)"
                                    @touchend="handleTouchEnd(note.id)"
                                >
                                    <h3 class="font-bold truncate">{{ note.text.substring(0, 30) }}</h3>
                                    <div class="space-x-4 truncate">
                                        <span>{{ formatDate(note.updatedAt) }}
                                        </span>
                                        <span
                                            v-if="note.text.length > 50"
                                            class="text-zinc-400"
                                        >...{{ note.text.substring(30, 50) }}
                                        </span>
                                    </div>
                                </div>
                                
                                <!-- Delete button revealed on swipe - ONLY on mobile -->
                                <div 
                                    v-if="!isDesktop && swipedNoteId === note.id"
                                    class="absolute top-0 right-0 bottom-0 w-[70px] bg-red-600 flex items-center justify-center"
                                    @click.stop="confirmDeleteNote(note)"
                                >
                                    <TrashIcon class="text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
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
                    :title="$t('modal.definitive')"
                    :message="$t('modal.confirm')"
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

            <template v-if="isLoading">
                <div class="space-y-8 mt-10">
                    <div v-for="n in 1" :key="n" class="space-y-4">
                    <div class="main-text-skeleton"></div>
                    <div class="main-note-skeleton"></div>
                    </div>
                </div>
            </template>

            <template v-else>
                <div class="text-zinc-200 p-8 max-w-[40%] mx-auto font-bodyTest">
                    <div v-if="selectedNote && selectedNote.id">
                        <p class="text-zinc-100 mb-8 text-lg">
                            <span>༄&nbsp;{{ formatOrToday(selectedNote.updatedAt) }}</span>
                        </p>
                        <textarea
                            ref="textarea"
                            v-model="updatedNote"
                            name="note"
                            id="note"
                            placeholder="Veuillez saisir votre texte ici..."
                            class="text-[#030303] my-4 bg-[#d5c7e2] rounded-md p-4 -ml-36 md:-ml-5 border-[0.5px] border-purple-900
                            focus:outline-none focus:text-[#d5c7e2] focus:bg-[#030303] shadow-lg w-96 md:w-full min-h-[300px] cursor-text"
                            @input="() => {
                                debouncedFn()
                                selectedNote.text = updatedNote
                            }"
                        >
                            {{ selectedNote.text }}
                        </textarea>
                    </div>
                    <div v-else class="text-zinc-400 italic text-center mt-10">
                        {{ $t('notes.nothing') }}
                    </div>
                </div>
            </template>
            
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
    import MouseTrail from '@/components/MouseTrail.vue'
    import { useI18n } from 'vue-i18n'
    import ConfirmModal from '@/components/ConfirmModal.vue'
    import { nextTick, ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
    import { useDebounceFn } from '@vueuse/core'
    import { useToast } from 'vue-toast-notification'
    import { useRouter } from 'vue-router'
    import { useLocalePath } from '#i18n'

    const { t, locale } = useI18n()
    const localePath = useLocalePath()
    const router = useRouter()
    const updatedNote = ref('')
    const notes = ref([])
    const selectedNote = ref({})
    const textarea = ref(null)
    const sidebarOpen = ref(false)
    const isDesktop = ref(false)
    const isLoading = ref(true)

    const $toast = useToast()
    const showConfirmModal = ref(false)
    const noteToDelete = ref(null)
    
    // Swipe functionality
    const swipedNoteId = ref(null)
    const touchStartX = ref(0)
    const touchEndX = ref(0)
    const touchStartY = ref(0);
    const touchEndY = ref(0);
    const notesContainer = ref(null);
    const scrollPosition = ref(0);
    const minSwipeDistance = 50 // minimum distance required for a swipe

    function changeLocale(newLocale) {
        locale.value = newLocale
        $toast.success(`${t('toast.language')}${newLocale}`)
        router.push({ path: `/${newLocale}` })
    }

    definePageMeta({
        middleware: ['auth'],
    })

    function logout() {
        const jwtCookie = useCookie('NoteJWT')
        jwtCookie.value = null
        navigateTo(localePath('/login'))
    }

    const confirmDeleteNote = (note) => {
        noteToDelete.value = note
        showConfirmModal.value = true
    }

    const handleConfirmDelete = async () => {
        showConfirmModal.value = false
        try {
            const noteId = noteToDelete.value?.id || selectedNote.value.id
            await $fetch(`/api/notes/${noteId}`, {
                method: 'DELETE',
            })

            notes.value = notes.value.filter(n => n.id !== noteId)
            
            // Reset swipe state
            swipedNoteId.value = null
            
            // If we deleted the currently selected note, select another one
            if (selectedNote.value.id === noteId) {
                selectedNote.value = notes.value[0] || {}
                updatedNote.value = selectedNote.value?.text || ''
            }
            
            noteToDelete.value = null
            $toast.success(t('toast.noteDeletion'))
        } catch (error) {
            console.error("Erreur suppression:", error)
            $toast.error(t('toast.deletionError'))
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
            
            nextTick(() => {
                if (textarea.value) {
                    textarea.value.focus()
                }
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    const debouncedFn = useDebounceFn(async() => {
        await updateNote()
    }, 1000)

    async function updateNote() {
        try {
            const response = await $fetch(`/api/notes/${selectedNote.value.id}`, {
                method: 'PATCH',
                body: {
                    updatedNote: updatedNote.value,
                }
            })
        
            // Update the local note's updatedAt property to reflect the server change
            const updatedNoteIndex = notes.value.findIndex(n => n.id === selectedNote.value.id)
            if (updatedNoteIndex !== -1) {
                notes.value[updatedNoteIndex].updatedAt = new Date().toISOString()
                selectedNote.value.updatedAt = new Date().toISOString()
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    // Touch event handlers for swipe functionality
    function handleTouchStart(event, noteId) {
        if (isDesktop.value) return // Skip on desktop
        touchStartX.value = event.touches[0].clientX
        touchEndX.value = event.touches[0].clientX
    }

    function handleTouchStartY(event) {
        if (isDesktop.value) return; // Skip on desktop
        touchStartY.value = event.touches[0].clientY;
        touchEndY.value = touchStartY.value;
    }

    function handleTouchMove(event, noteId) {
        if (isDesktop.value) return // Skip on desktop
        touchEndX.value = event.touches[0].clientX
        
        // Calculate swipe distance
        const swipeDistance = touchStartX.value - touchEndX.value
        
        // Only allow left swipes (positive distance)
        if (swipeDistance > 0) {
            // If swipe distance is greater than minimum, show delete button
            if (swipeDistance > minSwipeDistance) {
                swipedNoteId.value = noteId
            } else {
                // If user didn't swipe far enough, reset
                if (swipedNoteId.value === noteId) {
                    swipedNoteId.value = null
                }
            }
        } else {
            // If swiping right, close any open swipe
            if (swipedNoteId.value === noteId) {
                swipedNoteId.value = null
            }
        }
    }

    function handleTouchMoveY(event) {
        if (isDesktop.value) return; // Skip on desktop
        touchEndY.value = event.touches[0].clientY;

        const swipeDistance = touchStartY.value - touchEndY.value;

        // Only allow vertical swipes (up or down)
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            // Determine the direction of the swipe
            if (swipeDistance > 0) {
                // Up swipe (scroll down)
                if (notesContainer.value) {
                    notesContainer.value.scrollTop += 5; // Scroll down (adjust speed)
                }
            } else {
                // Down swipe (scroll up)
                if (notesContainer.value) {
                    notesContainer.value.scrollTop -= 5; // Scroll up (adjust speed)
                }
            }
        }
    }

    function handleTouchEnd(noteId) {
        if (isDesktop.value) return // Skip on desktop
        
        // Calculate final swipe distance
        const swipeDistance = touchStartX.value - touchEndX.value
        
        // If swipe was significant, keep the delete button visible
        // Otherwise, reset the swipe state
        if (swipeDistance < minSwipeDistance) {
            if (swipedNoteId.value === noteId) {
                swipedNoteId.value = null
            }
        }
    }

    function handleTouchEndY() {
        if (isDesktop.value) return; // Skip on desktop
        // Optionally reset swipe state after the gesture is complete
        touchStartY.value = 0;
        touchEndY.value = 0;
    }

    // Close any open swipe when clicking elsewhere
    function resetSwipe() {
        if (!isDesktop.value) { // Only needed on mobile
            swipedNoteId.value = null
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
        window.addEventListener('click', resetSwipe)

        isLoading.value = true

        try{
            const fetchedNotes = await $fetch('/api/notes')

            notes.value = fetchedNotes
            if (notes.value.length > 0) {
                selectedNote.value = notes.value
                    .slice()
                    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0]
                updatedNote.value = selectedNote.value.text
            }

            await new Promise(resolve => setTimeout(resolve, 500))

        } finally {
            isLoading.value = false
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
        return `${year}/${month}/${day}`
    }

    function formatOrToday(dateStr) {
        const date = new Date(dateStr)
        const today = new Date()

        const isSameDay =
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()

        if (isSameDay) {
            return t('notes.today') // Localized "Today"
        }

        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}/${month}/${day}`
    }

    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateScreenSize)
        window.removeEventListener('click', resetSwipe)
    })

    function updateScreenSize() {
        isDesktop.value = window.innerWidth >= 768 // md breakpoint
        if (isDesktop.value) {
            sidebarOpen.value = false // reset sidebar toggle on desktop
            swipedNoteId.value = null // reset any open swipes
        }
    }

    function toggleSidebar() {
        sidebarOpen.value = !sidebarOpen.value
    }

    function handleNoteClick(note) {
        // If a note is swiped open, just close it instead of selecting
        if (swipedNoteId.value === note.id && !isDesktop.value) {
            swipedNoteId.value = null
            return
        }
        
        selectedNote.value = note
        updatedNote.value = note.text
        if (!isDesktop.value) sidebarOpen.value = false
    }
</script>