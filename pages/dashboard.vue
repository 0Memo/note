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
            <button
                v-if="showInstall"
                @click="installApp"
                class="mt-6 ml-1 text-md text-white shadow-2xl font-semibold transform cursor-pointer hover:underline"
            >
                {{ $t('common.installApp') }}
            </button>
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
                        {{ isConnectingCalendar ? t('toast.calendar.connecting') : (calendarConnected ? t('toast.calendar.calendarConnected') : t('toast.calendar.connectCalendar')) }}
                    </button>
                    
                    <div v-if="calendarConnected" class="mt-2 text-green-400 text-sm flex items-center gap-1">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        {{ $t('toast.calendar.calendarConnected') }}
                    </div>
                </div>
                <button 
                    v-if="calendarConnected" 
                    @click="checkCalendarEvents"
                    class="ml-2 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
                >
                    {{ $t('toast.calendar.checkEvents') }}
                </button>

                <!-- Add this button next to your existing calendar buttons -->
                <button 
                    v-if="!calendarConnected && savedToken" 
                    @click="reconnectGoogleCalendar"
                    class="ml-2 bg-orange-600 hover:bg-orange-700 text-white text-sm px-3 py-1 rounded"
                >
                    {{ $t('toast.calendar.reconnect') }}
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
                    class="notes-container max-h-[550px] overflow-y-auto md:overflow-y-visible"
                    ref="notesContainer"
                    @touchstart="handleTouchStartY"
                    @touchmove="handleTouchMoveY"
                    @touchend="handleTouchEndY"
                >
                    <div>
                        <p class="text-md font-semibold text-zinc-200 mt-3 font-h1">
                            {{ $t('notes.upcoming') }}
                        </p>
                        <div class="text-zinc-200 mt-3 ml-2 text-sm font-bodyTest">
                            <div
                                v-for="note in upcomingNotes"
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
                                        <h3 class="font-bold truncate">{{ stripHtmlTags(note.text).substring(0, 30) }}</h3>
                                        <div class="space-x-4 truncate">
                                            <span>{{ formatDate(note.eventDate) }}</span>
                                            <span
                                                v-if="note.text.length > 50"
                                                class="text-zinc-400"
                                            >
                                                ...{{ stripHtmlTags(note.text).substring(30, 50) }}
                                            </span>
                                        </div>
                                    </div>

                                    <!-- Desktop buttons -->
                                    <button
                                        @click.stop="confirmDeleteNote(note)"
                                        class="md:flex hidden pl-8 items-center justify-center"
                                    >
                                        <TrashIcon class="text-red-500 font-bold hover:text-white" />
                                    </button>

                                    <button
                                        v-if="isDesktop && calendarConnected"
                                        @click.stop="syncNoteToCalendar(note)"
                                        :disabled="syncingNoteId === note.id || note.text === note.lastSyncedText"
                                        :title="(note.text === note.lastSyncedText) ? t('toast.calendar.alreadySynced') : t('toast.calendar.syncToCalendar')"
                                        class="[
                                            'ml-2 p-1 transition-colors duration-200',
                                            syncingNoteId === note.id || note.text === note.lastSyncedText
                                                ? 'text-gray-400 cursor-not-allowed'
                                                : 'text-blue-400 hover:text-blue-300 cursor-pointer'
                                        ]"
                                    >
                                        <svg
                                        v-if="syncingNoteId !== note.id"
                                        class="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"
                                            />
                                        </svg>
                                        <div
                                        v-else
                                        class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"
                                        ></div>
                                    </button>
                                </div>
                            </div>

                            <!-- Mobile swipe buttons -->
                            <div
                                v-if="!isDesktop && swipedNoteId === note.id"
                                class="absolute top-0 right-0 bottom-0 flex"
                            >
                                <button
                                v-if="calendarConnected"
                                @click.stop="syncNoteToCalendar(note)"
                                :disabled="syncingNoteId === note.id || note.text === note.lastSyncedText"
                                :class="[
                                    'w-[70px] flex items-center justify-center transition-colors duration-200',
                                    syncingNoteId === note.id || note.text === note.lastSyncedText
                                    ? 'bg-gray-600 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                                ]"
                                title="Sync to Calendar"
                                >
                                <svg
                                    v-if="syncingNoteId !== note.id"
                                    class="w-5 h-5 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                    d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"
                                    />
                                </svg>
                                <div
                                    v-else
                                    class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"
                                ></div>
                                </button>

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
                        <p class="text-md font-semibold text-zinc-200 mt-3 font-h1">{{ $t('notes.tomorrow') }}</p>
                        <div class="text-zinc-200 mt-3 ml-2 text-sm font-bodyTest">
                            <div
                                v-for="note in tomorrowsNotes"
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
                                            <h3 class="font-bold truncate">{{ stripHtmlTags(note.text).substring(0, 30) }}</h3>
                                            <div class="space-x-4 truncate">
                                                <span>{{ formatDate(note.eventDate) }}</span>
                                                <span
                                                    v-if="note.text.length > 50"
                                                    class="text-zinc-400"
                                                >...{{ stripHtmlTags(note.text).substring(30, 50) }}
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
                                            :disabled="syncingNoteId === note.id || note.text === note.lastSyncedText"
                                            :title="(note.text === note.lastSyncedText) ? t('toast.calendar.alreadySynced') : t('toast.calendar.syncToCalendar')"
                                            class="[
                                                'ml-2 p-1 transition-colors duration-200',
                                                syncingNoteId === selectedNote.id || selectedNote.text === selectedNote.lastSyncedText
                                                    ? 'text-gray-400 cursor-not-allowed'
                                                    : 'text-blue-400 hover:text-blue-300 cursor-pointer'
                                            ]"
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
                                        :disabled="syncingNoteId === note.id || note.text === note.lastSyncedText"
                                        :class="[
                                            'w-[70px] flex items-center justify-center transition-colors duration-200',
                                            syncingNoteId === note.id || note.text === note.lastSyncedText
                                            ? 'bg-gray-600 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                                        ]"
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
                        <p class="text-md font-semibold text-zinc-200 mt-3 font-h1">{{ $t('notes.today') }}</p>
                        <div class="text-zinc-200 mt-3 ml-2 text-sm font-bodyTest">
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
                                            <h3 class="font-bold truncate">{{ stripHtmlTags(note.text).substring(0, 30) }}</h3>
                                            <div class="space-x-4 truncate">
                                                <span>
                                                    {{ formatDate(note.eventDate || note.updatedAt) }}
                                                </span>
                                                <span
                                                    v-if="note.text.length > 50"
                                                    class="text-zinc-400"
                                                >...{{ stripHtmlTags(note.text).substring(30, 50) }}
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
                                            :disabled="syncingNoteId === note.id || note.text === note.lastSyncedText"
                                            :title="(note.text === note.lastSyncedText) ? t('toast.calendar.alreadySynced') : t('toast.calendar.syncToCalendar')"
                                            class="[
                                                'ml-2 p-1 transition-colors duration-200',
                                                syncingNoteId === selectedNote.id || selectedNote.text === selectedNote.lastSyncedText
                                                    ? 'text-gray-400 cursor-not-allowed'
                                                    : 'text-blue-400 hover:text-blue-300 cursor-pointer'
                                            ]"
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
                                        :disabled="syncingNoteId === note.id || note.text === note.lastSyncedText"
                                        :class="[
                                            'w-[70px] flex items-center justify-center transition-colors duration-200',
                                            syncingNoteId === note.id || note.text === note.lastSyncedText
                                            ? 'bg-gray-600 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                                        ]"
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
                        <p class="text-md font-semibold text-zinc-200 mt-3 font-h1">{{ $t('notes.yesterday') }}</p>
                        <div class="text-zinc-200 mt-3 ml-2 text-sm font-bodyTest">
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
                                            <h3 class="font-bold truncate">{{ stripHtmlTags(note.text).substring(0, 30) }}</h3>
                                            <div class="space-x-4 truncate">
                                                <span>{{ formatDate(note.eventDate || note.updatedAt) }}</span>
                                                <span
                                                    v-if="note.text.length > 50"
                                                    class="text-zinc-400"
                                                >...{{ stripHtmlTags(note.text).substring(30, 50) }}
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
                                            :disabled="syncingNoteId === note.id || note.text === note.lastSyncedText"
                                            :title="(note.text === note.lastSyncedText) ? t('toast.calendar.alreadySynced') : t('toast.calendar.syncToCalendar')"
                                            class="[
                                                'ml-2 p-1 transition-colors duration-200',
                                                syncingNoteId === selectedNote.id || selectedNote.text === selectedNote.lastSyncedText
                                                    ? 'text-gray-400 cursor-not-allowed'
                                                    : 'text-blue-400 hover:text-blue-300 cursor-pointer'
                                            ]"
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
                                        :disabled="syncingNoteId === note.id || note.text === note.lastSyncedText"
                                        :class="[
                                            'w-[70px] flex items-center justify-center transition-colors duration-200',
                                            syncingNoteId === note.id || note.text === note.lastSyncedText
                                            ? 'bg-gray-600 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                                        ]"
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
                        <p class="text-md font-semibold text-zinc-200 mt-3 font-h1">{{ $t('notes.previous') }}</p>
                        <div class="text-zinc-200 mt-3 ml-2 text-sm font-bodyTest">
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
                                            <h3 class="font-bold truncate">{{ stripHtmlTags(note.text).substring(0, 30) }}</h3>
                                            <div class="space-x-4 truncate">
                                                <span>
                                                    {{ formatDate(note.eventDate || note.updatedAt) }}
                                                </span>
                                                <span
                                                    v-if="note.text.length > 50"
                                                    class="text-zinc-400"
                                                >...{{ stripHtmlTags(note.text).substring(30, 50) }}
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
                                            :disabled="syncingNoteId === note.id || note.text === note.lastSyncedText"
                                            :title="(note.text === note.lastSyncedText) ? t('toast.calendar.alreadySynced') : t('toast.calendar.syncToCalendar')"
                                            class="[
                                                'ml-2 p-1 transition-colors duration-200',
                                                syncingNoteId === selectedNote.id || selectedNote.text === selectedNote.lastSyncedText
                                                    ? 'text-gray-400 cursor-not-allowed'
                                                    : 'text-blue-400 hover:text-blue-300 cursor-pointer'
                                            ]"
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
                                        :disabled="syncingNoteId === note.id || note.text === note.lastSyncedText"
                                        :class="[
                                            'w-[70px] flex items-center justify-center transition-colors duration-200',
                                            syncingNoteId === note.id || note.text === note.lastSyncedText
                                            ? 'bg-gray-600 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                                        ]"
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
                        <div class="mb-8 text-lg flex flex-row items-center gap-2">
                            <button @click="startTranscription" class="focus:outline-none pr-2">
                                <Microphone class="w-8 h-8 text-white font-bold relative -top-2"/>
                            </button>
                            <div class="flex items-center gap-2 min-h-[36px] w-full">
                                <template v-if="editingDate">
                                    <div class="flex flex-col space-y-1 md:space-y-0 md:flex-row h-[36px]">
                                        <input
                                            type="date"
                                            v-model="manualDate"
                                            class="text-black rounded px-2 w-[138px] -ml-4 md:ml-0 md:w-full md:mr-4"
                                        />
                                    
                                        <button @click="saveDateChange" class="-ml-4 md:ml-0 text-xs text-green-500 underline md:mr-2">
                                            {{ $t('notes.confirm') }}
                                        </button>
                                        <button @click="toggleDateEdit" class="-ml-4 md:ml-0 text-xs text-red-500 underline">
                                            {{ $t('notes.cancel') }}
                                        </button>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="h-[36px]">
                                        <span>{{ formattedDisplayedDate }}</span>
                                        <button @click="toggleDateEdit" class="text-xs underline md:ml-2">
                                            {{ $t('notes.change') }}
                                        </button>
                                    </div>
                                </template>
                            </div>

                            <!-- Calendar sync button for current note -->
                            <button 
                                v-if="calendarConnected" 
                                @click="syncNoteToCalendar(selectedNote)"
                                :disabled="syncingNoteId === selectedNote.id || isNoteUnchanged"
                                class="ml-6 md:-ml-10 md:mr-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white text-sm px-1 md:px-2 py-1 rounded transition-colors duration-200 flex items-center gap-1 -mt-3 md:mt-0"
                                title="Sync this note to Google Calendar"
                            >
                                <svg v-if="syncingNoteId !== selectedNote.id" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                                </svg>
                                <div v-else class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                <span class="hidden sm:inline">{{ $t('toast.calendar.syncToCalendar') }}</span>
                                <span class="inline sm:hidden">Sync</span>
                            </button>
                        </div>
                        <div class="my-4 bg-[#d5c7e2] border-purple-900 rounded-md p-4 -ml-[8.5rem] md:-ml-5 shadow-lg w-[23rem] md:w-full min-h-[300px]">
                            <Editor
                                ref="textarea"
                                v-model="updatedNote"
                                api-key= '7km3i00h6yxuuaielxdn70k4rzu7iswd10aw8f5ftnpvjspd'
                                :init="{
                                    height: 300,
                                    menubar: false,
                                    plugins: 'lists link image code table',
                                    toolbar:
                                    'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat code',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }"
                                :placeholder="$t('notes.text')"
                                name="note"
                                id="note"
                                @input="debouncedFn"
                            />
                        </div>
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
            <IosInstallBanner />
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
    import { deferredPrompt, showInstall } from '../plugins/pwa-install.client'
    import Editor from '@tinymce/tinymce-vue'

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
    const selectedNote = ref(null)
    const textarea = ref(null)
    const sidebarOpen = ref(false)
    const isDesktop = ref(false)
    const isLoading = ref(true)
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
    const showMouseTrail = ref(false)
    const speechText = ref('')
    const userWantsCalendarSync = ref(true)

    // New calendar-related refs
    const isConnectingCalendar = ref(false)
    const calendarConnected = ref(false)
    const isSyncing = ref(false)
    const accessToken = ref(null)
    const syncingNoteId = ref(null)
    const editingDate = ref(false)
    const manualDate = ref('')

    function installApp() {
        if (!deferredPrompt.value) return;
        deferredPrompt.value.prompt();
        deferredPrompt.value.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            deferredPrompt.value = null;
            showInstall.value = false;
        });
    }

    function stripHtmlTags(input) {
        return input?.replace(/<[^>]*>?/gm, '') || '';
    }

    function sanitizeHTML(dirty) {
        const temp = document.createElement('div');
        temp.innerHTML = dirty;
        // Remove script, iframe, etc.
        const allowedTags = ['b', 'i', 'u', 'strong', 'em', 'p', 'br', 'ul', 'ol', 'li', 'span'];
        const walker = document.createTreeWalker(temp, NodeFilter.SHOW_ELEMENT, null, false);
        let node;
        while ((node = walker.nextNode())) {
            if (!allowedTags.includes(node.nodeName.toLowerCase())) {
                node.replaceWith(...node.childNodes);
            }
            [...node.attributes].forEach(attr => node.removeAttribute(attr)); // Optional: remove all attributes
        }
        return temp.innerHTML;
    }

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

    const formattedDisplayedDate = computed(() => {
        const dateToShow = selectedNote.value?.eventDate || selectedNote.value?.updatedAt
        return formatOrToday(dateToShow)
    })

    function toggleDateEdit() {
        editingDate.value = !editingDate.value
        if (editingDate.value) {
            manualDate.value =
            selectedNote.value?.eventDate?.slice(0, 10) ||
            new Date().toISOString().slice(0, 10)
        }
    }

    async function saveDateChange() {
        const id = selectedNote.value?.id;
        const rawDate = manualDate.value;

        if (!id || !rawDate || isNaN(new Date(rawDate).getTime())) {
            console.warn("Missing ID or date");
            alert("Cannot update: missing note ID or date.");
            return;
        }
        const isoDate = new Date(rawDate).toISOString();

        console.log("🟡 Sending date update:", { id, eventDate: isoDate });

        try {
            const updatedNote = await $fetch("/api/notes/update-date", {
                method: "POST",
                body: {
                    id,
                    eventDate: isoDate,
                },
            });

            selectedNote.value = {
                ...selectedNote.value,
                eventDate: updatedNote.eventDate,
            }

            const index = notes.value.findIndex((n) => n.id === id)
            if (index !== -1) {
                notes.value[index] = {
                    ...notes.value[index],
                    eventDate: updatedNote.eventDate,
                }
            }
            editingDate.value = false;
        } catch (err) {
            console.error("❌ Failed to save custom date:", err);
            alert("Failed to update date. Check console.");
        }
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

            const noteDate = note.eventDate || note.updatedAt
            const hasChanged = note.text !== note.lastSyncedText || 
                            (note.lastSyncedDate?.slice(0, 10) !== noteDate?.slice(0, 10))

            if (!hasChanged && note.calendarEventId) {
                $toast.error(t('toast.calendar.alreadySynced'))
                return
            }

            // Decide which date to sync to
            const today = new Date().toISOString().slice(0, 10) // yyyy-mm-dd
            const eventDate = note.eventDate
                ? new Date(note.eventDate).toISOString().slice(0, 10)
                : null

            const finalDateISO =
                eventDate && eventDate !== today
                ? new Date(note.eventDate).toISOString()
                : new Date(note.updatedAt).toISOString()

            const sanitizedText = sanitizeHTML(note.text || '')

            const eventData = {
                id: note.id,
                title: stripHtmlTags(sanitizedText).substring(0, 50) || 'Untitled Note',
                text: note.text || '',
                date: finalDateISO,
                eventId: note.calendarEventId || null
            }

            const response = await $fetch('/api/notes/sync-calendar', {
                method: 'POST',
                headers: { 'x-google-access-token': token },
                body: { note: eventData }
            })

            if (response.alreadySynced) {
                $toast.error(t('toast.calendar.alreadySynced'))
                return
            }

            // Save eventId back to the note
            if (response.eventId && !note.calendarEventId) {
                note.calendarEventId = response.eventId
            }

            note.lastSyncedText = note.text
            note.lastSyncedDate = note.eventDate || new Date().toISOString()
            note.synced = true

            selectedNote.value = { ...selectedNote.value }

            if (response.updated) {
                $toast.success(t('toast.calendar.updated'))
            } else {
                $toast.success(t('toast.calendar.sync'))
            }
        } catch (error) {
            console.error('Error syncing to calendar:', error)
            if (error.status === 401) {
                calendarConnected.value = false
                accessToken.value = null
                localStorage.removeItem('googleCalendarToken')
                $toast.error(t('toast.calendar.expired'))
            } else {
                $toast.error(t('toast.calendar.failed') + (error.message || 'Unknown error'))
            }
        } finally {
            syncingNoteId.value = null
        }
    }

    const isNoteUnchanged = computed(() => {
        const note = selectedNote.value
        if (!note) return true

        const hasNeverSynced = !note.lastSyncedText || !note.lastSyncedDate
        if (hasNeverSynced) return false // allow syncing

        const textUnchanged = note.text === note.lastSyncedText
        const dateUnchanged = new Date(note.eventDate).toISOString().slice(0, 10) === new Date(note.lastSyncedDate).toISOString().slice(0, 10)

        return textUnchanged && dateUnchanged
    })

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
            const cleanText = sanitizeHTML(updatedNote.value)
            const response = await $fetch(`/api/notes/${selectedNote.value.id}`, {
                method: 'PATCH',
                body: {
                    updatedNote: cleanText,
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

    const checkCalendarConnection = async () => {
        const token = localStorage.getItem('googleCalendarToken')
        if (!token) {
            calendarConnected.value = false
            return
        }

        try {
            // Try to list events with access token
            await $fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=1', {
            headers: {
                Authorization: `Bearer ${token}`
            }
            })
            calendarConnected.value = true
        } catch (error) {
            console.warn('❌ Google Calendar token expired or invalid:', error?.response?._data || error.message)
            calendarConnected.value = false
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
            $toast.info(t('toast.calendar.eventsFound', { count: eventCount }))
            
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

    const isAccessTokenValid = async () => {
        try {
            const response = await $fetch('/api/auth/check-calendar-status');
            return response.status === 'connected';
        } catch (error) {
            console.error('Error checking token status:', error);
            return false;
        }
    };

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
            const combined = (updatedNote.value ? updatedNote.value + '\n' : '') + transcript
            updatedNote.value = sanitizeHTML(combined)

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

    function getReferenceDate(note) {
        return note.eventDate ? new Date(note.eventDate) : new Date(note.updatedAt)
    }

    const upcomingNotes = computed(() => {
        if (!Array.isArray(notes.value)) return []

        const dayAfterTomorrow = new Date();
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
        dayAfterTomorrow.setHours(0, 0, 0, 0);

        return notes.value
            .filter((note) => {
                const noteDate = getReferenceDate(note);
                return noteDate > dayAfterTomorrow;
            })
            .sort((a, b) => getReferenceDate(b) - getReferenceDate(a));
    })

    
    const todayStr = new Date().toDateString();
    const yesterdayDate = new Date();
    const tomorrowDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const yesterdayStr = yesterdayDate.toDateString();
    const tomorrowStr = tomorrowDate.toDateString();

    const tomorrowsNotes = computed(() => {
        if (!Array.isArray(notes.value)) return [];
        return notes.value
            .filter(note => getReferenceDate(note).toDateString() === tomorrowStr)
            .sort((a, b) => getReferenceDate(b) - getReferenceDate(a));
    });

    const todaysNotes = computed(() => {
        if (!Array.isArray(notes.value)) return [];
        return notes.value
            .filter(note => getReferenceDate(note).toDateString() === todayStr)
            .sort((a, b) => getReferenceDate(b) - getReferenceDate(a));
    });

    const yesterdaysNotes = computed(() => {
        if (!Array.isArray(notes.value)) return [];
        return notes.value
            .filter(note => getReferenceDate(note).toDateString() === yesterdayStr)
            .sort((a, b) => getReferenceDate(b) - getReferenceDate(a));
    });

    const earlierNotes = computed(() => {
        if (!Array.isArray(notes.value)) return [];
        return notes.value
            .filter(note => {
            const noteDate = getReferenceDate(note);
            return noteDate < yesterdayDate && noteDate.toDateString() !== yesterdayStr;
            })
            .sort((a, b) => getReferenceDate(b) - getReferenceDate(a));
    });

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
            accessToken.value = savedToken;
            const stillValid = await isAccessTokenValid();
            calendarConnected.value = stillValid;

            if (!stillValid) {
                $toast.info(t('toast.calendar.reconnect'), { duration: 6000 });
            }
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

        await checkCalendarConnection()

        // Optionally: automatically try to refresh token if it failed
        if (!calendarConnected.value) {
            try {
                await refreshAccessTokenIfNeeded() // We'll define this next
                await checkCalendarConnection() // Try again after refresh
            } catch (err) {
                console.warn('Could not refresh token:', err)
            }
        }

        updateScreenSize()
        window.addEventListener('resize', updateScreenSize)
        window.addEventListener('click', resetSwipe)

        isLoading.value = true

        try{
            const fetchedNotes = await $fetch('/api/notes')

            // ✅ FIXED: Ensure we always set an array
            notes.value = Array.isArray(fetchedNotes)
                ? fetchedNotes.map(note => ({
                    ...note,
                    // ✅ Enrich each note with sync status
                    synced: !!note.calendarEventId && note.lastSyncedText === note.text,
                    lastSyncedDate: note.lastSyncedDate ? new Date(note.lastSyncedDate) : null,
                    createdAt: note.createdAt ? new Date(note.createdAt) : null,
                    updatedAt: note.updatedAt ? new Date(note.updatedAt) : null,
                }))
                : []

            console.log("📥 Notes fetched:", fetchedNotes)
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

    const refreshAccessTokenIfNeeded = async () => {
        const refreshToken = useCookie('google_refresh_token').value
        if (!refreshToken) {
            throw new Error('No refresh token found.')
        }

        const refreshed = await $fetch('/api/refresh-token') // we’ll create this endpoint below
        if (refreshed?.access_token) {
            localStorage.setItem('googleCalendarToken', refreshed.access_token)
        } else {
            throw new Error('Failed to refresh token')
        }
    }

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

        if (isSameDay) return t('notes.today')

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