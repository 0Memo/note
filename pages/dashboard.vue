<template>
    <div class="flex h-screen bg-primary">
        <ClientOnly>
            <MouseTrail v-if="showMouseTrail" />
        </ClientOnly>
        <!-- Easter 
        <div class="absolute inset-0 pointer-events-none z-[1]">
            <Easter />
        </div>-->
        <div
            class="md:hidden fixed top-0 left-0 right-0 z-[100] bg-secondary flex items-center justify-between px-6 py-4 shadow-md cursor-pointer border-double border-b-4 border-white"
        >
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
            <p class="relative z-50 mt-6 ml-1 text-md text-zinc-300">
                <nuxt-link
                    :to="localePath('/')"
                    class="font-semibold text-white transform shadow-2xl cursor-pointer shadow-purple-900 custom-underline underline-purple scalable-text">
                    {{ $t('homepage.title') }}
                </nuxt-link>
            </p>
            <!-- <button
                v-if="showInstall"
                @click="installApp"
                class="mt-6 ml-1 font-semibold text-white transform shadow-2xl cursor-pointer text-md custom-underline underline-purple"
            >
                {{ $t('common.installApp') }}
            </button> -->
            <div class="relative z-50 flex flex-wrap justify-center gap-2 mt-8 text-white md:mt-6">
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

                <div class="flex justify-around w-full py-2 md:hidden text-md">
                    <nuxt-link
                        :to="localePath('/privacy')"
                        class="whitespace-nowrap custom-underline underline-purple"
                    >
                        {{ $t('modal.privacy.title') }}
                    </nuxt-link>
                    <nuxt-link
                        :to="localePath('/terms')"
                        class="whitespace-nowrap custom-underline underline-purple"
                    >
                        {{ $t('modal.terms.title') }}
                    </nuxt-link>
                </div>

                <div class="w-full mt-4">
                    <button 
                        @click="connectGoogleCalendar" 
                        :disabled="isConnectingCalendar"
                        class="flex items-center justify-center w-full gap-2 px-4 py-2 font-bold text-white transition-colors duration-200 bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-500"
                    >
                        <svg v-if="!isConnectingCalendar" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                        </svg>
                        <div v-else class="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                        {{ isConnectingCalendar ? t('toast.calendar.connecting') : (calendarConnected ? t('toast.calendar.calendarConnected') : t('toast.calendar.connectCalendar')) }}
                    </button>
                    
                    <div v-if="calendarConnected" class="flex items-center gap-1 mt-2 text-sm text-green-400">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        {{ $t('toast.calendar.calendarConnected') }}
                    </div>
                </div>

                <!-- Add this button next to your existing calendar buttons -->
                <button 
                    v-if="!calendarConnected && savedToken" 
                    @click="reconnectGoogleCalendar"
                    class="px-3 py-1 ml-2 text-sm text-white bg-orange-600 rounded hover:bg-orange-700"
                >
                    {{ $t('toast.calendar.reconnect') }}
                </button>

                <div class="p-4 mt-6 rounded-lg bg-secondary">
                    <h3 class="mb-3 font-semibold text-white scalable-text">
                        {{ $t('accessibility.accessibility') }}
                    </h3>
                    
                    <FontSizeToggle />
                    
                    <!-- High Contrast Toggle -->
                    <div class="flex items-center justify-between mb-3">
                        <label class="text-sm text-white scalable-text">
                            {{ $t('accessibility.highContrast') }}
                        </label>
                        <button
                            @click="toggleHighContrast"
                            :class="[
                                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                                highContrast ? 'bg-purple-600' : 'bg-gray-600'
                            ]"
                        >
                            <span
                                :class="[
                                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                                    highContrast ? 'translate-x-6' : 'translate-x-1'
                                ]"
                            />
                        </button>
                    </div>
                </div>
            </div>

            <template v-if="isLoading">
                <!-- Show a few skeleton loaders -->
                <div class="my-10 space-y-10">
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
                        <p class="mt-3 font-semibold text-md text-zinc-200 font-h1 scalable-text">
                            {{ $t('notes.upcoming') }}
                        </p>
                        <div class="mt-3 ml-2 text-sm text-zinc-200 font-bodyTest">
                            <div
                                v-for="note in upcomingNotes"
                                :key="note.id"
                                class="relative overflow-hidden"
                            >
                            <!-- Swipeable note container -->
                            <div
                                class="p-4 transition-transform duration-300 rounded-lg cursor-pointer"
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
                                        <h3 class="font-bold truncate scalable-text">{{ decodeHtmlEntities(stripHtmlTags(note.text)).substring(0, 30) }}</h3>
                                        <div class="space-x-4 truncate">
                                            <span>{{ formatDate(note.eventDate) }}</span>
                                            <span
                                                v-if="note.text.length > 50"
                                                class="text-zinc-400"
                                            >
                                                ...{{ decodeHtmlEntities(stripHtmlTags(note.text)).substring(30, 50) }}
                                            </span>
                                        </div>
                                    </div>

                                    <!-- Desktop buttons -->
                                    <button
                                        @click.stop="confirmDeleteNote(note)"
                                        class="items-center justify-center hidden pl-8 md:flex"
                                    >
                                        <TrashIcon class="font-bold text-red-500 hover:text-white" />
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
                                        class="w-4 h-4 border-b-2 border-blue-400 rounded-full animate-spin"
                                        ></div>
                                    </button>
                                </div>
                            </div>

                            <!-- Mobile swipe buttons -->
                            <div
                                v-if="!isDesktop && swipedNoteId === note.id"
                                class="absolute top-0 bottom-0 right-0 flex"
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
                                    class="w-5 h-5 border-b-2 border-white rounded-full animate-spin"
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
                        <p class="mt-3 font-semibold text-md text-zinc-200 font-h1 scalable-text">{{ $t('notes.tomorrow') }}</p>
                        <div class="mt-3 ml-2 text-sm text-zinc-200 font-bodyTest">
                            <div
                                v-for="note in tomorrowsNotes"
                                :key="note.id"
                                class="relative overflow-hidden"
                            >
                                <!-- Swipeable note container -->
                                <div
                                    class="p-4 transition-transform duration-300 rounded-lg cursor-pointer"
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
                                            <h3 class="font-bold truncate scalable-text">{{ decodeHtmlEntities(stripHtmlTags(note.text)).substring(0, 30) }}</h3>
                                            <div class="space-x-4 truncate">
                                                <span>{{ formatDate(note.eventDate) }}</span>
                                                <span
                                                    v-if="note.text.length > 50"
                                                    class="text-zinc-400"
                                                >...{{ decodeHtmlEntities(stripHtmlTags(note.text)).substring(30, 50) }}
                                                </span>
                                            </div>
                                        </div>

                                        <button 
                                            @click.stop="confirmDeleteNote(note)"
                                            class="items-center justify-center hidden pl-8 md:flex"
                                        >
                                            <TrashIcon class="font-bold text-red-500 hover:text-white" />
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
                                        <div v-else class="w-4 h-4 border-b-2 border-blue-400 rounded-full animate-spin"></div>
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Delete button revealed on swipe - ONLY on mobile -->
                                <div v-if="!isDesktop && swipedNoteId === note.id" class="absolute top-0 bottom-0 right-0 flex">
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
                                        <div v-else class="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
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
                        <p class="mt-3 font-semibold text-md text-zinc-200 font-h1 scalable-text">{{ $t('notes.today') }}</p>
                        <div class="mt-3 ml-2 text-sm text-zinc-200 font-bodyTest">
                            <div
                                v-for="note in todaysNotes"
                                :key="note.id"
                                class="relative overflow-hidden"
                            >
                                <!-- Swipeable note container -->
                                <div
                                    class="p-4 transition-transform duration-300 rounded-lg cursor-pointer"
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
                                            <h3 class="font-bold truncate scalable-text">{{ decodeHtmlEntities(stripHtmlTags(note.text)).substring(0, 30) }}</h3>
                                            <div class="space-x-4 truncate">
                                                <span>
                                                    {{ formatDate(note.eventDate || note.updatedAt) }}
                                                </span>
                                                <span
                                                    v-if="note.text.length > 50"
                                                    class="text-zinc-400"
                                                >...{{ decodeHtmlEntities(stripHtmlTags(note.text)).substring(30, 50) }}
                                                </span>
                                            </div>
                                        </div>

                                        <button 
                                            @click.stop="confirmDeleteNote(note)"
                                            class="items-center justify-center hidden pl-8 md:flex"
                                        >
                                            <TrashIcon class="font-bold text-red-500 hover:text-white" />
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
                                            <div v-else class="w-4 h-4 border-b-2 border-blue-400 rounded-full animate-spin"></div>
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Delete button revealed on swipe - ONLY on mobile -->
                                <div v-if="!isDesktop && swipedNoteId === note.id" class="absolute top-0 bottom-0 right-0 flex">
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
                                        <div v-else class="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
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
                        <p class="mt-3 font-semibold text-md text-zinc-200 font-h1 scalable-text">{{ $t('notes.yesterday') }}</p>
                        <div class="mt-3 ml-2 text-sm text-zinc-200 font-bodyTest">
                            <div
                                v-for="note in yesterdaysNotes"
                                :key="note.id"
                                class="relative overflow-hidden"
                            >
                                <!-- Swipeable note container -->
                                <div
                                    class="p-4 transition-transform duration-300 rounded-lg cursor-pointer"
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
                                            <h3 class="font-bold truncate scalable-text">{{ decodeHtmlEntities(stripHtmlTags(note.text)).substring(0, 30) }}</h3>
                                            <div class="space-x-4 truncate">
                                                <span>{{ formatDate(note.eventDate || note.updatedAt) }}</span>
                                                <span
                                                    v-if="note.text.length > 50"
                                                    class="text-zinc-400"
                                                >...{{ decodeHtmlEntities(stripHtmlTags(note.text)).substring(30, 50) }}
                                                </span>
                                            </div>
                                        </div>

                                        <button 
                                            @click.stop="confirmDeleteNote(note)"
                                            class="items-center justify-center hidden pl-8 md:flex"
                                        >
                                            <TrashIcon class="font-bold text-red-500 hover:text-white" />
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
                                        <div v-else class="w-4 h-4 border-b-2 border-blue-400 rounded-full animate-spin"></div>
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Delete button revealed on swipe - ONLY on mobile -->
                                <div v-if="!isDesktop && swipedNoteId === note.id" class="absolute top-0 bottom-0 right-0 flex">
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
                                        <div v-else class="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
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
                        <p class="mt-3 font-semibold text-md text-zinc-200 font-h1 scalable-text">{{ $t('notes.previous') }}</p>
                        <div class="mt-3 ml-2 text-sm text-zinc-200 font-bodyTest">
                            <div
                                v-for="note in earlierNotes"
                                :key="note.id"
                                class="relative overflow-hidden"
                            >
                                <!-- Swipeable note container -->
                                <div
                                    class="p-4 transition-transform duration-300 rounded-lg cursor-pointer"
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
                                            <h3 class="font-bold truncate scalable-text">{{ decodeHtmlEntities(stripHtmlTags(note.text)).substring(0, 30) }}</h3>
                                            <div class="space-x-4 truncate">
                                                <span>
                                                    {{ formatDate(note.eventDate || note.updatedAt) }}
                                                </span>
                                                <span
                                                    v-if="note.text.length > 50"
                                                    class="text-zinc-400"
                                                >...{{ decodeHtmlEntities(stripHtmlTags(note.text)).substring(30, 50) }}
                                                </span>
                                            </div>
                                        </div>

                                        <button 
                                            @click.stop="confirmDeleteNote(note)"
                                            class="items-center justify-center hidden pl-8 md:flex"
                                        >
                                            <TrashIcon class="font-bold text-red-500 hover:text-white" />
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
                                        <div v-else class="w-4 h-4 border-b-2 border-blue-400 rounded-full animate-spin"></div>
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Delete button revealed on swipe - ONLY on mobile -->
                                <div v-if="!isDesktop && swipedNoteId === note.id" class="absolute top-0 bottom-0 right-0 flex">
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
                                        <div v-else class="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
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

        <div class="w-full overflow-y-scroll bg-secondary md:overflow-y-auto">
            <div class="flex items-start justify-between p-8 mt-16 text-white md:mt-0">
                <button
                    class="gap-3 right
                    text-white hover:text-zinc-500 shadow-lg
                    absolute left-[7.5rem] bottom-8 md:static"
                    @click="createNewNote"
                    :data-tooltip="$t('tooltip.createNote')"
                    data-position="right1"
                >
                    <Pencil class="w-10 h-10 font-bold" />
                </button>
                <ConfirmModal
                    :visible="showConfirmModal"
                    :title="$t('modal.definitive')"
                    :message="$t('modal.confirm')"
                    @confirm="handleConfirmDelete"
                    @cancel="showConfirmModal = false"
                />
                <button
                    class="hover:text-zinc-500 left shadow-lg absolute
                    right-[7.5rem] md:static bottom-8 md:right-8"
                    @click="showConfirmModal = true"
                    :data-tooltip="$t('tooltip.deleteNote')"
                    data-position="left1"
                >
                    <TrashIcon class="w-10 h-10 font-bold" />
                </button>
            </div>

            <template v-if="isLoading">
                <div class="mt-10 space-y-8">
                    <div v-for="n in 1" :key="n" class="space-y-4">
                        <div class="main-text-skeleton"></div>
                        <div class="main-note-skeleton"></div>
                    </div>
                </div>
            </template>

            <template v-else>
                <div class="text-white p-8 max-w-[40%] mx-auto font-bodyTest">
                    <div v-if="selectedNote && selectedNote.id">
                        <div class="-ml-14 sm:ml-0 w-fit">
                            <div class="flex flex-row items-center gap-2 mb-8 text-lg">
                                <button
                                    @click="startTranscription" class="pr-2 text-white shadow-lg focus:outline-none left hover:text-zinc-500"
                                    :data-tooltip="$t('tooltip.dictateNote')"
                                    data-position="left2"
                                >
                                    <Microphone class="relative w-8 h-8 font-bold -top-2"/>
                                </button>
                                <button
                                    @click="readNoteAloud(selectedNote?.text)"  class="pr-2 text-white shadow-lg focus:outline-none top hover:text-zinc-500"
                                    :data-tooltip="$t('tooltip.listenNote')"
                                    data-position="top"
                                >
                                    <VoiceReading class="relative w-8 h-8 font-bold -top-2"/>
                                </button>
                                <div class="flex items-center gap-2 min-h-[36px] w-full">
                                    <template v-if="editingDate">
                                        <div class="flex flex-col space-y-1 md:space-y-0 md:flex-row h-[36px]">
                                            <input
                                                type="date"
                                                v-model="manualDate"
                                                class="text-black rounded px-2 w-[138px] -ml-4 md:ml-0 md:w-full md:mr-4"
                                            />
                                        
                                            <button @click="saveDateChange" class="-ml-4 text-xs text-white md:ml-0 custom-underline underline-green md:mr-2 scalable-text">
                                                {{ $t('notes.confirm') }}
                                            </button>
                                            <button @click="toggleDateEdit" class="-ml-4 text-xs text-white md:ml-0 custom-underline underline-red scalable-text">
                                                {{ $t('notes.cancel') }}
                                            </button>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div class="h-[36px]">
                                            <span>{{ formattedDisplayedDate }}</span>
                                            <button @click="toggleDateEdit" class="text-xs custom-underline underline-purple md:ml-2 scalable-text">
                                                {{ $t('notes.change') }}
                                            </button>
                                        </div>
                                    </template>
                                </div>
                            
                                <!-- Calendar sync button for current note -->
                                <button 
                                    v-if="calendarConnected" 
                                    @click="syncNoteToCalendar(selectedNote)"
                                    :class="[
                                        'ml-6 md:-ml-10 md:mr-4 text-white text-sm px-1 md:px-2 py-1 rounded transition-colors duration-200 flex items-center gap-1 -mt-3 md:mt-0',
                                        isSyncButtonDisabled
                                            ? 'bg-gray-500 cursor-not-allowed' 
                                            : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                                    ]"
                                    :disabled="isSyncButtonDisabled"
                                    title="Sync this note to Google Calendar"
                                >
                                    <svg v-if="syncingNoteId !== selectedNote.id" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                                    </svg>
                                    <div v-else class="w-4 h-4 border-b-2 border-white rounded-full animate-spin"></div>
                                    <span class="hidden sm:inline">{{ $t('toast.calendar.syncToCalendar') }}</span>
                                    <span class="inline sm:hidden">Sync</span>
                                </button>
                            </div>
                        </div>
                        <div class="relative my-4 bg-[#d5c7e2] border-purple-900 rounded-md p-4 -ml-[8.75rem] md:-ml-5 shadow-lg w-[22.5rem] md:w-full min-h-[300px]">
                            <!-- <Editor
                                ref="editorRef"
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
                            /> -->
                            <div class="overflow-hidden text-black bg-white border border-white rounded-lg">
                                <div v-if="editor" class="flex flex-wrap gap-1 p-2 text-black shadow-md rounded-tl-md rounded-tr-md md:gap-2 bg-gray-50">
                                    <button
                                        @click="editor.chain().focus().undo().run()"
                                        class="px-2 py-1 text-sm rounded hover:bg-gray-200"
                                        type="button"
                                    >
                                        ↶
                                    </button>
                                    <button
                                        @click="editor.chain().focus().redo().run()"
                                        class="px-2 py-1 text-sm rounded hover:bg-gray-200"
                                        type="button"
                                    >
                                        ↷
                                    </button>
                                    <div class="hidden w-px h-6 mx-1 bg-gray-300 md:block"></div>
                                    <button
                                        @click="editor.chain().focus().toggleBold().run()"
                                        :class="{ 'bg-gray-300': editor.isActive('bold') }"
                                        class="px-2 py-1 text-sm font-medium rounded hover:bg-gray-200"
                                        type="button"
                                    >
                                        B
                                    </button>
                                    <button
                                        @click="editor.chain().focus().toggleItalic().run()"
                                        :class="{ 'bg-gray-300': editor.isActive('italic') }"
                                        class="px-2 py-1 text-sm italic rounded hover:bg-gray-200"
                                        type="button"
                                    >
                                        I
                                    </button>
                                    <button
                                        @click="editor.chain().focus().toggleUnderline().run()"
                                        :class="{ 'bg-gray-300': editor.isActive('underline') }"
                                        class="px-2 py-1 text-sm underline rounded hover:bg-gray-200"
                                        type="button"
                                    >
                                        U
                                    </button>
                                    <div class="hidden w-px h-6 mx-1 bg-gray-300 md:block"></div>
                                    <button
                                        @click="editor.chain().focus().setTextAlign('left').run()"
                                        :class="{ 'bg-gray-300': editor.isActive({ textAlign: 'left' }) }"
                                        class="px-2 py-1 text-sm rounded hover:bg-gray-200"
                                        type="button"
                                    >
                                        ←
                                    </button>
                                    <button
                                        @click="editor.chain().focus().setTextAlign('center').run()"
                                        :class="{ 'bg-gray-300': editor.isActive({ textAlign: 'center' }) }"
                                        class="px-2 py-1 text-sm rounded hover:bg-gray-200"
                                        type="button"
                                    >
                                        ↔
                                    </button>
                                    <button
                                        @click="editor.chain().focus().setTextAlign('right').run()"
                                        :class="{ 'bg-gray-300': editor.isActive({ textAlign: 'right' }) }"
                                        class="px-2 py-1 text-sm rounded hover:bg-gray-200"
                                        type="button"
                                    >
                                        →
                                    </button>
                                    <div class="hidden w-px h-6 mx-1 bg-gray-300 md:block"></div>
                                    <button
                                        @click="editor.chain().focus().toggleBulletList().run()"
                                        :class="{ 'bg-gray-300': editor.isActive('bulletList') }"
                                        class="px-2 py-1 text-sm rounded hover:bg-gray-200"
                                        type="button"
                                    >
                                        •
                                    </button>
                                    <button
                                        @click="editor.chain().focus().toggleOrderedList().run()"
                                        :class="{ 'bg-gray-300': editor.isActive('orderedList') }"
                                        class="px-2 py-1 text-sm rounded hover:bg-gray-200"
                                        type="button"
                                    >
                                        1.
                                    </button>
                                    
                                </div>
                                <EditorContent
                                    :editor="editor" 
                                    :placeholder="$t('notes.text')"
                                    class="min-h-[300px]"
                                />
                                
                                <!-- ✅ Green check indicator -->
                                <transition name="fade">
                                    <div v-if="showSavedIndicator" 
                                        :class="saveIndicatorClass"
                                        class="absolute px-3 py-1 text-sm rounded-md shadow bottom-3 right-4">
                                    {{ saveIndicatorText }}
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </div>
                    <div v-else class="mt-10 italic text-center text-zinc-400">
                        {{ $t('notes.nothing') }}
                    </div>
                </div>
            </template>

            <div
                class="md:hidden fixed bottom-[5.5rem] right-0 z-[100] flex items-center justify-between px-6 py-4cursor-pointer"
                @click="toggleSidebar"
            >
                <ClickLogo class="bg-[#9333ea] p-2 rounded-full shadow-md " />
            </div>

            <button
                @click="toggleMouseTrail"
                class="text-white absolute left-4 md:left-[292px] bottom-0 pb-6 pt-10 md:p-8 hover:text-zinc-500"
            >
                <!-- Replace with your preferred icon -->
                <span v-if="showMouseTrail">
                    <ClientOnly>
                        <button
                            class="right"
                            :data-tooltip="$t('tooltip.deactivate')"
                            data-position="right"
                        >
                            <MouseTrailOff class="w-10 h-10 font-bold" />
                        </button>
                    </ClientOnly>
                </span>
                <span v-else>
                    <ClientOnly>
                        <button
                            class="right"
                            :data-tooltip="$t('tooltip.activate')"
                            data-position="right"
                        >
                            <MouseTrailOn class="w-10 h-10 font-bold" />
                        </button>
                    </ClientOnly>
                </span>
            </button>
            
            <button
                class="absolute bottom-0 right-0 p-8 text-white left hover:text-zinc-500"
                @click="logout"
                :data-tooltip="$t('tooltip.logout')"
                data-position="left"
            >
                <Logout class="w-10 h-10 font-bold" />
            </button>

            <footer
                class="fixed bottom-0 left-0 flex items-center w-full text-white bg-transparent md:bottom-8 justify-evenly text-md md:text-lg scalable-text"
            >
                <nuxt-link
                    :to="localePath('/privacy')"
                    class="whitespace-nowrap custom-underline underline-purple"
                >
                    {{ $t('modal.privacy.title') }}
                </nuxt-link>
                <nuxt-link
                    :to="localePath('/terms')"
                    class="whitespace-nowrap custom-underline underline-purple"
                >
                    {{ $t('modal.terms.title') }}
                </nuxt-link>
            </footer>
            <!-- <IosInstallBanner /> -->
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
    import { useEditor, EditorContent } from '@tiptap/vue-3'
    import StarterKit from '@tiptap/starter-kit'
    import { Link } from '@tiptap/extension-link'
    import { Image } from '@tiptap/extension-image'
    import { Table } from '@tiptap/extension-table'
    import { TableRow } from '@tiptap/extension-table-row'
    import { TableHeader } from '@tiptap/extension-table-header'
    import { TableCell } from '@tiptap/extension-table-cell'
    import { TextAlign } from '@tiptap/extension-text-align'
    import { Underline } from '@tiptap/extension-underline'
    import FontSizeToggle from '@/components/FontSizeToggle.vue'

    definePageMeta({
        middleware: ['auth'],
    })

    let Capacitor = null
    let TextToSpeech = null
    let SpeechRecognition = null

    if (typeof window !== 'undefined' && window.Capacitor) {
        import('@capacitor/core').then(mod => {
            Capacitor = mod.Capacitor
        }).catch(err => console.warn('Capacitor core not available:', err))

        import('@capacitor-community/text-to-speech').then(mod => {
            TextToSpeech = mod.TextToSpeech
        }).catch(err => console.warn('TTS not available:', err))

        import('@capacitor-community/speech-recognition').then(mod => {
            SpeechRecognition = mod.SpeechRecognition
        }).catch(err => console.warn('Speech Recognition not available:', err))
    } else {
    console.log('Running on web – Capacitor plugins disabled.')
    }

    const config = useRuntimeConfig()
    const { t, locale } = useI18n()
    const localePath = useLocalePath()
    const router = useRouter()
    const $toast = useToast()

    const updatedNote = ref('')
    const notes = ref([])
    const selectedNote = ref(null)
    const sidebarOpen = ref(false)
    const isDesktop = ref(false)
    const isLoading = ref(true)
    const showConfirmModal = ref(false)
    const noteToDelete = ref(null)
    // Swipe functionality
    const swipedNoteId = ref(null)
    const touchStartX = ref(0)
    const touchEndX = ref(0)
    const touchStartY = ref(0)
    const touchEndY = ref(0)
    const notesContainer = ref(null)
    const scrollPosition = ref(0)
    const minSwipeDistance = 50
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
    const showSavedIndicator = ref(false)
    const saveIndicatorType = ref('saving')

    const saveIndicatorClass = computed(() => {
        switch (saveIndicatorType.value) {
            case 'saving':
            return 'text-blue-700 bg-blue-100 border border-blue-300'
            case 'saved':
            return 'text-green-700 bg-green-100 border border-green-300'
            case 'error':
            return 'text-red-700 bg-red-100 border border-red-300'
            default:
            return 'text-green-700 bg-green-100 border border-green-300'
        }
    })

    const saveIndicatorText = computed(() => {
        switch (saveIndicatorType.value) {
            case 'saving':
            return '💾 ' + (t('toast.saving') || 'Saving...')
            case 'saved':
            return '✔ ' + (t('toast.saved') || 'Note saved')
            case 'error':
            return '⚠ ' + (t('toast.saveError') || 'Save failed')
            default:
            return '✔ ' + (t('toast.saved') || 'Note saved')
        }
    })

    const savedToken = ref(null)
    const highContrast = ref(false)
    const reducedMotion = ref(false)
    const enhancedFocus = ref(false)

    const editor = useEditor({
        content: '',
        extensions: [
            StarterKit,
            Image,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        onUpdate: ({ editor }) => {
            const newContent = editor.getHTML()
            if (newContent !== updatedNote.value) {
                updatedNote.value = newContent
                showSavingIndicator()
                debouncedFn()
            }
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4',
                style: 'font-family: Helvetica, Arial, sans-serif; font-size: 14px;'
            },
        },
    })

    function showSavingIndicator() {
        saveIndicatorType.value = 'saving'
        showSavedIndicator.value = true
    }

    function showSavedIndicatorSuccess() {
        saveIndicatorType.value = 'saved'
        showSavedIndicator.value = true
        setTimeout(() => {
            showSavedIndicator.value = false
        }, 2500)
    }

    function showSavedIndicatorError() {
        saveIndicatorType.value = 'error'
        showSavedIndicator.value = true
        setTimeout(() => {
            showSavedIndicator.value = false
        }, 3000)
    }

    const isSyncButtonDisabled = computed(() =>
        syncingNoteId.value === selectedNote.value?.id || isNoteUnchanged.value
    )

    function toggleHighContrast() {
        highContrast.value = !highContrast.value
        localStorage.setItem('highContrast', highContrast.value.toString())
        applyAccessibilitySettings()
    }

    function applyAccessibilitySettings() {
        const root = document.documentElement
        
        if (highContrast.value) {
            root.classList.add('high-contrast')
        } else {
            root.classList.remove('high-contrast')
        }
    }

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

    function decodeHtmlEntities(text) {
        if (!text) return '';
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
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
                if (editor.value && selectedNote.value?.text) {
                    editor.value.commands.setContent(selectedNote.value.text)
                }
            }
            
            noteToDelete.value = null
            $toast.success(t('toast.noteDeletion'))
        } catch (error) {
            console.error("Erreur suppression:", error)
            $toast.error(t('toast.deletionError'))
        }
    }

    function getDateString(date) {
        if (!date) return ''
        return date instanceof Date
            ? date.toISOString().slice(0, 10)
            : typeof date === 'string'
            ? date.slice(0, 10)
            : ''
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
            const hasChanged =
                note.text !== note.lastSyncedText ||
                getDateString(note.lastSyncedDate) !== getDateString(noteDate || note.updatedAt)

            if (!hasChanged && note.calendarEventId) {
                $toast.error(t('toast.calendar.alreadySynced'))
                return
            }

            const today = new Date().toISOString().slice(0, 10)
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
                title: decodeHtmlEntities(stripHtmlTags(sanitizedText)).substring(0, 50) || 'Untitled Note',
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

            if (response.eventId && !note.calendarEventId) {
                note.calendarEventId = response.eventId
            }

            const updatedNote = {
                ...note,
                lastSyncedText: note.text,
                lastSyncedDate: note.eventDate || note.updatedAt,
            }

            const index = notes.value.findIndex((n) => n.id === note.id)
            if (index !== -1) {
                notes.value[index] = updatedNote
            }

            selectedNote.value = {...updatedNote}

            await nextTick()

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

        const lastSynced = getDateString(note.lastSyncedDate)
        const currentDate = getDateString(note.eventDate || note.updatedAt)

        return note.text === note.lastSyncedText && lastSynced === currentDate
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

            if (editor.value) {
                editor.value.commands.setContent('')
                editor.value.commands.focus()
            }
        } catch (error) {
            console.log('error', error)
            $toast.error(t('toast.creationError'))
        }
    }

    const debouncedFn = useDebounceFn(async() => {
        await updateNote()
    }, 1000)

    async function updateNote() {
        if (!selectedNote.value?.id) {
            showSavedIndicator.value = false
            return
        }

        try {
            const cleanText = sanitizeHTML(updatedNote.value)

            // include credentials to ensure cookies (NoteJWT) are sent
            const response = await $fetch(`/api/notes/${selectedNote.value.id}`, {
                method: 'PATCH',
                body: {
                    // keep backend expectations and be flexible
                    updatedNote: cleanText,
                    text: cleanText, // harmless duplicate for future-proofing
                    eventDate: selectedNote.value?.eventDate ?? null,
                },
                // ensure cookies are sent (client-side)
                credentials: 'include',
            })

            // If backend returns success, update local state
            if (response && response.success) {
            if (Array.isArray(notes.value)) {
                const idx = notes.value.findIndex(n => n.id === selectedNote.value.id)
                if (idx !== -1) {
                    const now = new Date().toISOString()
                    notes.value[idx].updatedAt = now
                    notes.value[idx].text = cleanText
                    // Only update eventDate when backend sent one
                    if (response.note?.eventDate) notes.value[idx].eventDate = response.note.eventDate
                    selectedNote.value.updatedAt = now
                    selectedNote.value.text = cleanText
                }
            }
            showSavedIndicatorSuccess()
            } else {
                // Backend returned a non-success payload (edge-case)
                console.warn('Update responded but success !== true', response)
                showSavedIndicatorError()
            }
        } catch (error) {
            // log full error object for debugging
            console.error('updateNote failed:', error)
            // If fetch throws with response body (nitro error), log it
            if (error?.data) console.error('error.data:', error.data)
            if (error?.message) console.error('error.message:', error.message)
            showSavedIndicatorError()
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

    if (calendarConnected.value) {
        savedToken.value = null
    }

    const reconnectGoogleCalendar = () => {
        localStorage.removeItem('googleCalendarToken')
        calendarConnected.value = false

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

    function handleTouchStart(event, noteId) {
        if (isDesktop.value) return
        touchStartX.value = event.touches[0].clientX
        touchEndX.value = event.touches[0].clientX
    }

    function handleTouchStartY(event) {
        if (isDesktop.value) return;
        touchStartY.value = event.touches[0].clientY;
        touchEndY.value = touchStartY.value;
    }

    function handleTouchMove(event, noteId) {
        if (isDesktop.value) return
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

    async function readNoteAloud(noteText) {
        const text = decodeHtmlEntities(stripHtmlTags(noteText || updatedNote.value || ''));
        if (!text.trim()) {
            $toast.error(t('toast.noTextToRead'));
            return;
        }

        const langMap = {
            fr: 'fr-FR',
            es: 'es-ES',
            pt: 'pt-BR',
            it: 'it-IT',
            ro: 'ro-RO',
            sv: 'sv-SE',
            en: 'en-US',
        };

        const appLang = langMap[locale.value] || 'en-US';

        if (Capacitor.isNativePlatform()) {
            try {
                await TextToSpeech.speak({
                    text,
                    lang: appLang,
                    rate: 1.0,
                    pitch: 1.0,
                    volume: 1.0,
                })
                $toast.success(t('toast.readingNote'))
            } catch (err) {
                console.error('TTS failed:', err)
                $toast.error(t('toast.speechSynthesisUnsupported'))
            }
        } else {
            // Fallback to browser API
            const synth = window.speechSynthesis
            if (!synth) {
                $toast.error(t('toast.speechSynthesisUnsupported'))
                return
            }
            $toast.success(t('toast.readingNote'))
            const utterance = new SpeechSynthesisUtterance(text)
            utterance.lang = appLang
            synth.cancel()
            synth.speak(utterance)
        }
    }

    let isRecognizing = false
    let listenersAdded = false;

    function handlePartial(data) {
        console.log('Partial:', data.matches);
    }

    async function handleFinal(data) {
        console.log('Final:', data.matches);
        const transcript = data.matches?.join(' ') || '';
        if (!transcript) return;

        const combined = (updatedNote.value ? updatedNote.value + '\n' : '') + transcript;
        updatedNote.value = sanitizeHTML(combined);

        if (editor.value) editor.value.commands.setContent(updatedNote.value);
        if (selectedNote.value) {
            selectedNote.value.text = updatedNote.value;
            selectedNote.value.updatedAt = new Date().toISOString();
        }

        $toast.success(t('toast.transcribed'));
        await updateNote();
        isRecognizing = false;
    }

    async function startTranscription() {
        if (isRecognizing) return;
        isRecognizing = true;

        try {
            if (Capacitor.isNativePlatform()) {
                const isAvailable = await SpeechRecognition.available();
                if (!isAvailable.available) {
                    $toast.error(t('toast.speechServiceNotAvailable') || 'Speech recognition service not available.');
                    isRecognizing = false;
                    return;
                }

                if (!listenersAdded) {
                    SpeechRecognition.addListener('partialResults', handlePartial);
                    SpeechRecognition.addListener('result', handleFinal);
                    listenersAdded = true;
                }

                await SpeechRecognition.start({
                    language: { fr: 'fr-FR', es: 'es-ES', pt: 'pt-BR', it: 'it-IT', ro: 'ro-RO', sv: 'sv-SE' }[locale.value] || 'en-US',
                    partialResults: true,
                    popup: false,
                });
            } else {
                // Browser fallback
                const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
                if (!SpeechRecognitionAPI) {
                    $toast.error(t('toast.speechRecognition'));
                    isRecognizing=false;
                    return;
                }

                const recognition = new SpeechRecognitionAPI();
                recognition.lang = { fr: 'fr-FR', es: 'es-ES', pt: 'pt-BR', it: 'it-IT', ro: 'ro-RO', sv: 'sv-SE' }[locale.value] || 'en-US';
                recognition.interimResults = false;
                recognition.continuous = true;

                recognition.onstart = () =>  $toast.info(t('toast.listening'));
                recognition.onresult = async (event) => {
                    const transcript = event.results[0][0].transcript;
                    const combined = (updatedNote.value ? updatedNote.value + '\n' : '') + transcript;
                    updatedNote.value = sanitizeHTML(combined);
                    
                    if (editor.value) editor.value.commands.setContent(updatedNote.value);
                    if (selectedNote.value) {
                        selectedNote.value.text = updatedNote.value;
                        selectedNote.value.updatedAt = new Date().toISOString();
                    }
                    $toast.success(t('toast.transcribed'));
                    await updateNote();
                };

                recognition.onerror = (event) => {
                    console.error('Speech recognition error:', event.error);
                    $toast.error(t('toast.speechError'));
                    isRecognizing = false;
                };

                recognition.onend = () => { isRecognizing = false };
                recognition.start();
            }
        } catch (err) {
            console.error('Speech recognition error:', err);
            $toast.error( t('toast.speechError') + '. Please ensure Google Voice Input is enabled.');
            isRecognizing = false;
        }
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

    function triggerSavedToast() {
        showSavedIndicator.value = true
        setTimeout(() => {
            showSavedIndicator.value = false
        }, 1500)
    }

    onMounted(async() => {
        const nuxtApp = useNuxtApp()
        await nuxtApp.$clearWebViewCache()
        highContrast.value = localStorage.getItem('highContrast') === 'true'
        applyAccessibilitySettings()
        // Check for existing calendar connection
        savedToken.value = localStorage.getItem('googleCalendarToken')
        if (accessToken.value) {
            localStorage.setItem('googleCalendarToken', accessToken.value)
        }
        if (savedToken.value) {
            accessToken.value = savedToken.value;
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

                if (editor.value && selectedNote.value.text) {
                    editor.value.commands.setContent(selectedNote.value.text)
                }
            }

            await new Promise(resolve => setTimeout(resolve, 500))

        } catch (error) {
            console.error('Error fetching notes:', error)
            notes.value = []
        } finally {
            isLoading.value = false
        }
    })

    const refreshAccessTokenIfNeeded = async () => {
        const refreshToken = useCookie('google_refresh_token').value
        if (!refreshToken) {
            throw new Error('No refresh token found.')
        }

        const refreshed = await $fetch('/api/refresh-token')
        if (refreshed?.access_token) {
            localStorage.setItem('googleCalendarToken', refreshed.access_token)
        } else {
            throw new Error('Failed to refresh token')
        }
    }

    watch(selectedNote, (newNote) => {
        if (newNote?.text !== updatedNote.value) {
            updatedNote.value = newNote?.text || ''
            if (editor.value) {
                editor.value.commands.setContent(updatedNote.value)
            }
        }
    })

    watch(updatedNote, (newText) => {
        if (selectedNote.value && selectedNote.value.text !== newText) {
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
        if (editor.value) {
            editor.value.destroy()
        }
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
        if (editor.value) {
            editor.value.commands.setContent(note.text || '')
        }
        if (!isDesktop.value) sidebarOpen.value = false
    }

    const focusEditor = () => {
        if (editor.value) {
            editor.value.commands.focus()
        }
    }
</script>