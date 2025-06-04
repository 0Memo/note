<template>
    <div class="h-screen bg-[#1c044f] flex">
        <ClientOnly>
            <MouseTrail v-if="showMouseTrail" />
        </ClientOnly>
        <!-- Easter 
        <div class="absolute inset-0 pointer-events-none z-[1]">
            <Easter />
        </div>-->
        <div
            class="md:hidden fixed top-0 left-0 right-0 z-[100] bg-[#1d073a] flex items-center justify-between px-6 py-4 shadow-md cursor-pointer border-double border-b-4 border-white"
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
            <p class="mt-6 ml-1 text-md text-zinc-300 relative z-50">
                <nuxt-link
                    :to="localePath('/')"
                    class="text-white shadow-2xl shadow-purple-900 font-semibold
                    transform cursor-pointer hover:underline">
                    {{ $t('homepage.title') }}
                </nuxt-link>
            </p>
            <div class="text-white flex flex-wrap justify-center gap-2 mt-8 md:mt-6 relative z-50">
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

                <div class="w-full flex md:hidden justify-around text-md py-2">
                    <nuxt-link
                        :to="localePath('/privacy')"
                        class="whitespace-nowrap hover:underline"
                    >
                        {{ $t('modal.privacy.title') }}
                    </nuxt-link>
                    <nuxt-link
                        :to="localePath('/terms')"
                        class="whitespace-nowrap hover:underline"
                    >
                        {{ $t('modal.terms.title') }}
                    </nuxt-link>
                </div>

                <div class="w-full mt-4">
                    <button 
                        @click="connectGoogleCalendar" 
                        :disabled="isConnectingCalendar"
                        class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        <svg v-if="!isConnectingCalendar" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                        </svg>
                        <div v-else class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        {{ isConnectingCalendar ? 'Connecting...' : (calendarConnected ? 'Calendar Connected' : 'Connect Google Calendar') }}
                    </button>
                    
                    <div v-if="calendarConnected" class="mt-2 text-green-400 text-sm flex items-center gap-1">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        Calendar Connected
                    </div>
                </div>
                <button 
                    v-if="calendarConnected" 
                    @click="checkCalendarEvents"
                    class="ml-2 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
                >
                    Check Calendar Events
                </button>

                <!-- Add this button next to your existing calendar buttons -->
                <button 
                    v-if="calendarConnected" 
                    @click="reconnectGoogleCalendar"
                    class="ml-2 bg-orange-600 hover:bg-orange-700 text-white text-sm px-3 py-1 rounded"
                >
                    Reconnect Calendar
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
                    class="notes-container max-h-[550px] md:max-h-screen overflow-y-auto md:overflow-hidden"
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
                                    <div class="flex items-center justify-between">
                                        <div class="flex-1 min-w-0">
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

                                        <button 
                                            @click.stop="confirmDeleteNote(note)"
                                            class="md:flex hidden pl-8 items-center justify-center"
                                        >
                                            <TrashIcon class="text-red-500 font-bold hover:text-white" />
                                        </button>

                                        <!-- Desktop Calendar Sync Button -->
                                        <button 
                                            v-if="isDesktop && calendarConnected" 
                                            @click.stop="syncNoteToCalendar(note)"
                                            :disabled="syncingNoteId === note.id"
                                            class="ml-2 p-1 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                            title="Sync to Google Calendar"
                                        >
                                            <svg v-if="syncingNoteId !== note.id" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                                            </svg>
                                            <div v-else class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Delete button revealed on swipe - ONLY on mobile -->
                                <div v-if="!isDesktop && swipedNoteId === note.id" class="absolute top-0 right-0 bottom-0 flex">
                                    <!-- Calendar Sync Button -->
                                    <button 
                                        v-if="calendarConnected"
                                        @click.stop="syncNoteToCalendar(note)"
                                        :disabled="syncingNoteId === note.id"
                                        class="w-[70px] bg-blue-600 flex items-center justify-center"
                                        title="Sync to Calendar"
                                    >
                                        <svg v-if="syncingNoteId !== note.id" class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                                        </svg>
                                        <div v-else class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    </button>
                                    <!-- Delete Button -->
                                    <button 
                                        @click.stop="confirmDeleteNote(note)"
                                        class="w-[70px] bg-red-600 flex items-center justify-center"
                                    >
                                        <TrashIcon class="text-white" />
                                    </button>
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
                                    <div class="flex items-center justify-between">
                                        <div class="flex-1 min-w-0">
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

                                        <button 
                                            @click.stop="confirmDeleteNote(note)"
                                            class="md:flex hidden pl-8 items-center justify-center"
                                        >
                                            <TrashIcon class="text-red-500 font-bold hover:text-white" />
                                        </button>

                                        <!-- Desktop Calendar Sync Button -->
                                        <button 
                                            v-if="isDesktop && calendarConnected" 
                                            @click.stop="syncNoteToCalendar(note)"
                                            :disabled="syncingNoteId === note.id"
                                            class="ml-2 p-1 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                            title="Sync to Google Calendar"
                                        >
                                        <svg v-if="syncingNoteId !== note.id" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                                        </svg>
                                        <div v-else class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Delete button revealed on swipe - ONLY on mobile -->
                                <div v-if="!isDesktop && swipedNoteId === note.id" class="absolute top-0 right-0 bottom-0 flex">
                                    <!-- Calendar Sync Button -->
                                    <button 
                                        v-if="calendarConnected"
                                        @click.stop="syncNoteToCalendar(note)"
                                        :disabled="syncingNoteId === note.id"
                                        class="w-[70px] bg-blue-600 flex items-center justify-center"
                                        title="Sync to Calendar"
                                    >
                                        <svg v-if="syncingNoteId !== note.id" class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                                        </svg>
                                        <div v-else class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    </button>
                                    <!-- Delete Button -->
                                    <button 
                                        @click.stop="confirmDeleteNote(note)"
                                        class="w-[70px] bg-red-600 flex items-center justify-center"
                                    >
                                        <TrashIcon class="text-white" />
                                    </button>
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
                                    <div class="flex items-center justify-between">
                                        <div class="flex-1 min-w-0">
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

                                        <button 
                                            @click.stop="confirmDeleteNote(note)"
                                            class="md:flex hidden pl-8 items-center justify-center"
                                        >
                                            <TrashIcon class="text-red-500 font-bold hover:text-white" />
                                        </button>

                                        <!-- Desktop Calendar Sync Button -->
                                        <button 
                                            v-if="isDesktop && calendarConnected" 
                                            @click.stop="syncNoteToCalendar(note)"
                                            :disabled="syncingNoteId === note.id"
                                            class="ml-2 p-1 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                            title="Sync to Google Calendar"
                                        >
                                        <svg v-if="syncingNoteId !== note.id" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                                        </svg>
                                        <div v-else class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Delete button revealed on swipe - ONLY on mobile -->
                                <div v-if="!isDesktop && swipedNoteId === note.id" class="absolute top-0 right-0 bottom-0 flex">
                                    <!-- Calendar Sync Button -->
                                    <button 
                                        v-if="calendarConnected"
                                        @click.stop="syncNoteToCalendar(note)"
                                        :disabled="syncingNoteId === note.id"
                                        class="w-[70px] bg-blue-600 flex items-center justify-center"
                                        title="Sync to Calendar"
                                    >
                                        <svg v-if="syncingNoteId !== note.id" class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                                        </svg>
                                        <div v-else class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    </button>
                                    <!-- Delete Button -->
                                    <button 
                                        @click.stop="confirmDeleteNote(note)"
                                        class="w-[70px] bg-red-600 flex items-center justify-center"
                                    >
                                        <TrashIcon class="text-white" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>

        <div class="w-full bg-[#1d073a] overflow-y-scroll md:overflow-y-auto">
            <div class="text-white flex p-8 justify-between items-start mt-16 md:mt-0">
                <button
                    class="inline-flex gap-3 font-bold
                    text-white hover:text-zinc-500 shadow-lg"
                    @click="createNewNote"
                >
                    <Pencil class="w-10 h-10" />
                </button>
                <ConfirmModal
                    :visible="showConfirmModal"
                    :title="$t('modal.definitive')"
                    :message="$t('modal.confirm')"
                    @confirm="handleConfirmDelete"
                    @cancel="showConfirmModal = false"
                />
                <button
                    class="hover:text-zinc-500 shadow-lg"
                    @click="showConfirmModal = true"
                >
                    <TrashIcon class="w-10 h-10" />
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
                <div class="text-white p-8 max-w-[40%] mx-auto font-bodyTest">
                    <div v-if="selectedNote && selectedNote.id">
                        <p class="mb-8 text-lg flex flex-row items-center gap-2">
                            <button @click="startTranscription" class="focus:outline-none">
                                <Microphone class="w-8 h-8 text-white font-bold relative -top-2"/>
                            </button>
                            &nbsp;{{ formatOrToday(selectedNote.updatedAt) }}

                            <!-- Calendar sync button for current note -->
                            <button 
                                v-if="calendarConnected" 
                                @click="syncNoteToCalendar(selectedNote)"
                                :disabled="syncingNoteId === selectedNote.id"
                                class="ml-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white text-sm px-3 py-1 rounded transition-colors duration-200 flex items-center gap-1"
                                title="Sync this note to Google Calendar"
                            >
                                <svg v-if="syncingNoteId !== selectedNote.id" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                                </svg>
                                <div v-else class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                <span class="hidden sm:inline">Sync to Calendar</span>
                            </button>
                        </p>
                        <textarea
                            ref="textarea"
                            v-model="updatedNote"
                            name="note"
                            id="note"
                            :placeholder="$t('notes.text')"
                            class="text-[#030303] my-4 bg-[#d5c7e2] rounded-md p-4 -ml-36 md:-ml-5 border-[0.5px] border-purple-900
                            focus:outline-none focus:text-white focus:bg-[#030303] shadow-lg w-96 md:w-full min-h-[300px] cursor-text"
                            @input="debouncedFn"
                        >
                        </textarea>
                    </div>
                    <div v-else class="text-zinc-400 italic text-center mt-10">
                        {{ $t('notes.nothing') }}
                    </div>
                </div>
            </template>

            <button
                @click="toggleMouseTrail"
                class="text-white font-bold absolute left-0 md:left-[292px] bottom-0 p-8 hover:text-zinc-500"
                :title="showMouseTrail ? 'Disable Mouse Trail' : 'Enable Mouse Trail'"
            >
                <!-- Replace with your preferred icon -->
                <span v-if="showMouseTrail">
                    <ClientOnly>
                        <MouseTrailOff class="w-10 h-10" />
                    </ClientOnly>
                </span>
                <span v-else>
                    <ClientOnly>
                        <MouseTrailOn class="w-10 h-10" />
                    </ClientOnly>
                </span>
            </button>
            
            <button
                class="text-white font-bold absolute right-0 bottom-0 p-8 hover:text-zinc-500"
                @click="logout"
            >
                <Logout class="w-10 h-10" />
            </button>

            <footer class="fixed bottom-0 md:bottom-8 left-0 w-full flex justify-evenly items-center text-white bg-transparent text-md md:text-lg">
                <nuxt-link
                    :to="localePath('/privacy')"
                    class="whitespace-nowrap hover:underline"
                >
                    {{ $t('modal.privacy.title') }}
                </nuxt-link>
                <nuxt-link
                    :to="localePath('/terms')"
                    class="whitespace-nowrap hover:underline"
                >
                    {{ $t('modal.terms.title') }}
                </nuxt-link>
            </footer>
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
    import { useCookie, navigateTo, useRuntimeConfig, useRoute } from '#app'

    definePageMeta({
        middleware: ['auth'],
    })

    const config = useRuntimeConfig()
    const { t, locale } = useI18n()
    const localePath = useLocalePath()
    const router = useRouter()
    const $toast = useToast()

    const updatedNote = ref('')
    const notes = ref([])
    const selectedNote = ref({})
    const textarea = ref(null)
    const sidebarOpen = ref(false)
    const isDesktop = ref(false)
    const isLoading = ref(true)
    const showConfirmModal = ref(false)
    const showPrivacyModal = ref(false)
    const showTermsModal = ref(false)
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
    const showMouseTrail = ref(false)
    const speechText = ref('')
    const userWantsCalendarSync = ref(true)

    // New calendar-related refs
    const isConnectingCalendar = ref(false)
    const calendarConnected = ref(false)
    const isSyncing = ref(false)
    const accessToken = ref(null)
    const syncingNoteId = ref(null)

    function toggleMouseTrail() {
        showMouseTrail.value = !showMouseTrail.value
    }

    function changeLocale(newLocale) {
        locale.value = newLocale
        $toast.success(`${t('toast.language')}${newLocale}`)
        router.push({ path: `/${newLocale}/dashboard` })
    }

    function logout() {
        const jwtCookie = useCookie('NoteJWT')
        jwtCookie.value = null
        // Clear calendar connection on logout
        localStorage.removeItem('googleCalendarToken')
        calendarConnected.value = false
        accessToken.value = null
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

    // Enhanced sync function
    const syncNoteToCalendar = async (note) => {
        if (!calendarConnected.value) {
            $toast.error(t('toast.calendar.connectFirst'))
            return
        }

        try {
            syncingNoteId.value = note.id

            const token = localStorage.getItem('googleCalendarToken')
            if (!token) {
                calendarConnected.value = false
                $toast.error(t('toast.calendar.expired'))
                return
            }

            const alreadySynced =
                note.calendarEventId &&
                note.lastSyncedText === note.text &&
                new Date(note.lastSyncedDate).toISOString() === new Date(note.updatedAt).toISOString();

            if (alreadySynced) {
                $toast.error(t('toast.calendar.alreadySynced'))
                return
            }

            const eventData = {
                id: note.id,
                title: note.text?.substring(0, 50) || 'Untitled Note',
                content: note.text || '',
                date: new Date(note.updatedAt).toISOString(),
                eventId: note.calendarEventId || null
            }

            const response = await $fetch('/api/notes/sync-calendar', {
                method: 'POST',
                headers: { 'x-google-access-token': token },
                body: { note: eventData }
            })

            if (response.eventId && !note.calendarEventId) {
                note.calendarEventId = response.eventId
            }

            note.lastSyncedText = note.text
            note.lastSyncedDate = note.updatedAt

            if (response.updated) {
                $toast.success(t('toast.calendar.updated'))
            } else {
                $toast.success(t('toast.calendar.sync'))
            }

            await $fetch(`/api/notes/${note.id}`, {
                method: 'PATCH',
                body: {
                    updatedNote: note.text,
                    syncMetaOnly: true, // 👈 We'll use this flag to avoid resetting sync fields
                    lastSyncedText: note.text,
                    lastSyncedDate: note.updatedAt,
                }
            })

        } catch (error) {
            console.error('Error syncing to calendar:', error)
            if (error.status === 401) {
                calendarConnected.value = false
                accessToken.value = null
                localStorage.removeItem('googleCalendarToken')
                $toast.error(t('toast.calendar.expired'))
            } else {
                $toast.error(t('toast.noSpeech') + (error.message || 'Unknown error'))
            }
        } finally {
            syncingNoteId.value = null
        }
    }

    async function createNewNote() {
        try {
            const newNote = await $fetch(`/api/notes`, { method: 'POST' })

            // ✅ Ensure notes.value is an array before using unshift
            if (!Array.isArray(notes.value)) {
                notes.value = []
            }
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
            $toast.error(t('toast.creationError'))
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
        
            // ✅ Ensure notes.value is an array before using findIndex
            if (Array.isArray(notes.value)) {
                const updatedNoteIndex = notes.value.findIndex(n => n.id === selectedNote.value.id)
                if (updatedNoteIndex !== -1) {
                    notes.value[updatedNoteIndex].updatedAt = new Date().toISOString()
                    selectedNote.value.updatedAt = new Date().toISOString()
                }
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    // Add this to your index.vue script
    const checkCalendarEvents = async () => {
        try {
            const token = localStorage.getItem('googleCalendarToken')
            if (!token) {
                $toast.error(t('toast.calendar.notConnected'))
                return
            }

            console.log('Using token (first 20 chars):', token.substring(0, 20) + '...')
            
            const response = await $fetch('/api/calendar/list-events', {
                headers: {
                    'x-google-access-token': token
                }
            })
            
            console.log('Full API response:', response)
            
            if (response.error) {
                if (response.tokenError || response.status === 401) {
                    // Token is expired or invalid
                    $toast.error(t('toast.calendar.token'))
                    // Clear the invalid token
                    localStorage.removeItem('googleCalendarToken')
                    calendarConnected.value = false
                    return
                }
                $toast.error(`Error: ${response.error}`)
                return
            }

            console.log('Events array:', response.events)
            console.log('Event count:', response.count)
            
            const eventCount = response.count || 0
            $toast.info(`Found ${eventCount} events for today`)
            
            // Log each event for debugging
            if (response.events && response.events.length > 0) {
                response.events.forEach((event, index) => {
                    console.log(`Event ${index + 1}:`, {
                        title: event.summary,
                        start: event.start,
                        end: event.end,
                        link: event.htmlLink
                    })
                })
            }
            
            return response.events
        } catch (error) {
            console.error('Error checking calendar events:', error)
            if (error.status === 401) {
                $toast.error(t('toast.calendar.token'))
                localStorage.removeItem('googleCalendarToken')
                calendarConnected.value = false
            } else {
                $toast.error(t('toast.calendar.checkFailed')  + error.message)
            }
        }
    }

    // Function to reconnect Google Calendar
    const reconnectGoogleCalendar = () => {
        // Clear existing token
        localStorage.removeItem('googleCalendarToken')
        calendarConnected.value = false
        
        // Redirect to connect again
        connectGoogleCalendar()
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

    let isRecognizing = false

    function startTranscription() {
        if (isRecognizing) return

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        if (!SpeechRecognition) {
            $toast.error(t('toast.speechRecognition'))
            return
        }

        const recognition = new SpeechRecognition()
        isRecognizing = true

        recognition.lang = {
            fr: 'fr-FR', es: 'es-ES', pt: 'pt-BR',
            it: 'it-IT', ro: 'ro-RO', sv: 'sv-SE'
        }[locale.value] || 'en-US'
        recognition.interimResults = false
        recognition.maxAlternatives = 1
        recognition.continuous = false // set to true if you want longer listening
        recognition.onspeechend = () => recognition.stop()

        recognition.onresult = async (event) => {
            const transcript = event.results[0][0].transcript
            updatedNote.value += (updatedNote.value ? '\n' : '') + transcript

            if (selectedNote.value) {
                selectedNote.value.text = updatedNote.value;
                selectedNote.value.updatedAt = new Date().toISOString(); // Update date to now
                
                // Optionally update the local notes array date too for UI update
                const idx = notes.value.findIndex(n => n.id === selectedNote.value.id);
                if (idx !== -1) {
                notes.value[idx].updatedAt = selectedNote.value.updatedAt;
                }
            }
            $toast.success(t('toast.transcribed'))
            isRecognizing = false

            try {
                await updateNote()
            } catch (e) {
                console.error("Error updating note after speech:", e)
            }
        }

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error)
            isRecognizing = false

            switch (event.error) {
            case 'no-speech':
                $toast.error(t('toast.noSpeech'))
                break
            case 'audio-capture':
                $toast.error(t('toast.audioError'))
                break
            case 'not-allowed':
                $toast.error(t('toast.permissionError'))
                break
            default:
                $toast.error(t('toast.speechError'))
                break
            }
        }

        recognition.onend = () => {
            isRecognizing = false
        }

        recognition.start()
        $toast.info(t('toast.listening'))
    }

    const todaysNotes = computed(() => {
        if (!Array.isArray(notes.value)) return []

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
        if (!Array.isArray(notes.value)) return []

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
        if (!Array.isArray(notes.value)) return []

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

    const connectGoogleCalendar = () => {
        isConnectingCalendar.value = true
        
        const clientId = config.public.googleClientId
        const redirectUri = encodeURIComponent(`${config.public.baseURL}/auth/callback`)
        const scope = encodeURIComponent('https://www.googleapis.com/auth/calendar.events')
        
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent&include_granted_scopes=true`
        
        $toast.info(t('toast.calendar.warning'), {
            duration: 8000
        })
        
        setTimeout(() => {
            window.location.href = url
        }, 2000)
    }

    // Handle OAuth callback
    const handleOAuthCallback = async (code) => {
        try {
            isConnectingCalendar.value = true
            
            // Exchange code for access token
            const response = await $fetch('/api/auth/google-calendar', {
                method: 'POST',
                body: { code }
            })
            
            if (response.access_token) {
                accessToken.value = response.access_token
                localStorage.setItem('googleCalendarToken', response.access_token)

                if (!response.refresh_token) {
                    calendarConnected.value = false;
                    $toast.error(t('toast.calendar.refreshToken'));
                    return;
                }

                calendarConnected.value = true                
                $toast.success(t('toast.calendar.success'))                
                // Clean up URL
                window.history.replaceState({}, document.title, window.location.pathname)
            }
        } catch (error) {
            console.error('Error handling OAuth callback:', error)
            $toast.error(t('toast.calendar.connectionFailed'))
        } finally {
            isConnectingCalendar.value = false
        }
    }

    onMounted(async() => {
        // Check for existing calendar connection
        const savedToken = localStorage.getItem('googleCalendarToken')
        if (savedToken) {
            accessToken.value = savedToken
            calendarConnected.value = true
        }

        // Check for OAuth callback
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        if (code) {
            await handleOAuthCallback(code)
        }

        // Check URL params for calendar connection status
        const route = useRoute()
        if (route.query.calendar_connected === 'true') {
            calendarConnected.value = true
            $toast.success(t('toast.calendar.success'))
            await router.replace({ query: {} })
        } else if (route.query.error) {
            $toast.error(t('toast.calendar.connectionFailed'))
            await router.replace({ query: {} })
        }

        updateScreenSize()
        window.addEventListener('resize', updateScreenSize)
        window.addEventListener('click', resetSwipe)

        isLoading.value = true

        try{
            const fetchedNotes = await $fetch('/api/notes')

            // ✅ FIXED: Ensure we always set an array
            notes.value = Array.isArray(fetchedNotes) ? fetchedNotes : []
            if (notes.value.length > 0) {
                selectedNote.value = notes.value
                    .slice()
                    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0]
                updatedNote.value = selectedNote.value.text || ''
            }

            await new Promise(resolve => setTimeout(resolve, 500))

        } catch (error) {
            console.error('Error fetching notes:', error)
            notes.value = [] // ✅ Ensure it's always an array on error
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

    watch(updatedNote, (newText) => {
        if (selectedNote.value) {
            selectedNote.value.text = newText
        }
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
        updatedNote.value = note.text || ''
        if (!isDesktop.value) sidebarOpen.value = false
    }
</script>