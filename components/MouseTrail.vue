<template>
    <div class="mouse-trail-container">
        <!-- Shooting star trail using SVG -->
        <svg class="trail-svg" :width="svgWidth" :height="svgHeight">
        <!-- Glow effect (larger, more transparent path underneath) -->
        <path
            :d="pathData"
            class="trail-glow"
            fill="none"
            stroke="#2f0b4a"
            :stroke-width="getStrokeWidth(30)"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        
        <!-- Main trail path -->
        <path
            :d="pathData"
            class="trail-path"
            fill="none"
            stroke="url(#shootingStarGradient)"
            :stroke-width="getStrokeWidth(30)"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        
        <!-- Star head (circle at the front of the trail) -->
        <circle
            v-if="points.length > 0"
            :cx="points[0].x"
            :cy="points[0].y"
            :r="getStrokeWidth(10) / 2"
            class="star-head"
            fill="#2f0b4a"
        />
        
        <!-- Definitions for gradients -->
        <defs>
            <linearGradient id="shootingStarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#2f0b4a" />
            <stop offset="20%" stop-color="#2f0b4a" />
            <stop offset="100%" stop-color="#2f0b4a" stop-opacity="0" />
            </linearGradient>
        </defs>
        </svg>
        
        <!-- Small sparkles that follow the trail -->
        <div 
        v-for="(sparkle, index) in sparkles" 
        :key="'sparkle-' + index"
        class="sparkle"
        :style="{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            opacity: sparkle.opacity,
            transform: `scale(${sparkle.scale})`,
            backgroundColor: sparkle.color
        }"
        ></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                points: [],
                sparkles: [],
                mouse: { x: 0, y: 0 },
                isActive: false,
                timer: null,
                animationFrame: null,
                maxPoints: 6,
                svgWidth: 0,
                svgHeight: 0,
                pathData: '',
                isMobile: false
            }
        },
        mounted() {
            // Set SVG dimensions
            this.svgWidth = window.innerWidth
            this.svgHeight = window.innerHeight
            
            // Check if mobile
            this.checkMobile()
            
            // Add event listeners
            window.addEventListener('mousemove', this.handleMouseMove)
            window.addEventListener('touchmove', this.handleTouchMove, { passive: false })
            window.addEventListener('resize', this.handleResize)
            
            // Start animation loop
            this.animationFrame = requestAnimationFrame(this.animateTrail)
        },
        beforeDestroy() {
            // Clean up
            window.removeEventListener('mousemove', this.handleMouseMove)
            window.addEventListener('touchmove', this.handleTouchMove, { passive: false })
            window.removeEventListener('resize', this.handleResize)
            
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame)
            }
            if (this.timer) {
                clearTimeout(this.timer)
            }
        },
        methods: {
            checkMobile() {
                this.isMobile = window.innerWidth < 768
            },
            
            // Get responsive stroke width based on device
            getStrokeWidth(baseWidth) {
                return this.isMobile ? baseWidth * 1.5 : baseWidth
            },
            
            handleMouseMove(e) {
                // Update mouse position
                this.mouse = { x: e.clientX, y: e.clientY }
                this.updateTrailState()
            },
            
            handleTouchMove(e) {
                // Prevent default to avoid scrolling while drawing
                e.preventDefault()
                
                if (e.touches && e.touches[0]) {
                        // Update mouse position from touch
                        this.mouse = { x: e.touches[0].clientX, y: e.touches[0].clientY }
                        this.updateTrailState()
                    }
            },
            
            updateTrailState() {
                // Set active state
                this.isActive = true
                
                // Clear previous timer
                if (this.timer) {
                    clearTimeout(this.timer)
                }
                
                // Reset points when movement resumes after being inactive
                if (this.points.length === 0 || !this.isActive) {
                    this.initPoints()
                }
                
                // Add a sparkle occasionally
                if (Math.random() < 0.2) {
                    this.addSparkle()
                }
                
                // Set timer to detect when movement stops
                this.timer = setTimeout(() => {
                    this.isActive = false
                }, 200)
            },
            
            handleResize() {
                this.svgWidth = window.innerWidth
                this.svgHeight = window.innerHeight
                this.checkMobile()
            },
            
            initPoints() {
                // Clear existing points
                this.points = []
                
                // Create new points all at current mouse position
                for (let i = 0; i < this.maxPoints; i++) {
                        this.points.push({
                        x: this.mouse.x,
                        y: this.mouse.y,
                        // Store original opacity for fade out effect
                        originalOpacity: 1 - (i / this.maxPoints),
                        opacity: 1 - (i / this.maxPoints)
                        })
                    }
            },
            
            addSparkle() {
                // Only add sparkles if we have points
                if (this.points.length < 2) return
                
                // Get a random point along the trail (not the first point)
                const randomIndex = Math.floor(Math.random() * (this.points.length - 1)) + 1
                const point = this.points[randomIndex]
                
                // Add some random offset
                const offset = 10
                const x = point.x + (Math.random() * offset * 2 - offset)
                const y = point.y + (Math.random() * offset * 2 - offset)
                
                // Create sparkle
                this.sparkles.push({
                    x,
                    y,
                    opacity: Math.random() * 0.7 + 0.3,
                    scale: Math.random() * 0.5 + 0.5,
                    color: this.getRandomSparkleColor()
                })
                
                // Limit number of sparkles
                if (this.sparkles.length > 20) {
                        this.sparkles.shift()
                    }
            },
            
            getRandomSparkleColor() {
                const colors = ['#2f0b4a', '#2f0b4a', '#2f0b4a', '#fff']
                return colors[Math.floor(Math.random() * colors.length)]
            },
            
            animateTrail() {
                if (this.isActive && this.points.length > 0) {
                    // Update first point to current mouse position
                    this.points[0].x = this.mouse.x
                    this.points[0].y = this.mouse.y
                    this.points[0].opacity = this.points[0].originalOpacity
                    
                    // Update rest of points with easing
                    for (let i = this.points.length - 1; i > 0; i--) {
                        const point = this.points[i]
                        const prevPoint = this.points[i - 1]
                        
                        // Smooth following with easing
                        point.x += (prevPoint.x - point.x) * 0.45
                        point.y += (prevPoint.y - point.y) * 0.45
                        point.opacity = point.originalOpacity
                    }
                } else {
                    // Fade out when not active
                    let allFaded = true
                    
                    for (let i = 0; i < this.points.length; i++) {
                        if (this.points[i].opacity > 0) {
                            this.points[i].opacity -= 0.08
                            allFaded = false
                        }
                    }
                    
                    // Clear points when fully faded
                    if (allFaded && this.points.length > 0) {
                    this.points = []
                    }
                }
                
                // Animate sparkles
                for (let i = this.sparkles.length - 1; i >= 0; i--) {
                    const sparkle = this.sparkles[i]
                    sparkle.opacity -= 0.05
                    sparkle.scale -= 0.03
                    
                    // Remove faded sparkles
                    if (sparkle.opacity <= 0 || sparkle.scale <= 0) {
                    this.sparkles.splice(i, 1)
                    }
                }
                
                // Generate SVG path data
                this.updatePathData()
                
                // Continue animation
                this.animationFrame = requestAnimationFrame(this.animateTrail)
            },
            
            updatePathData() {
                if (this.points.length < 2) {
                    this.pathData = ''
                    return
                }
                
                // Create smooth curve through points
                let path = `M ${this.points[0].x} ${this.points[0].y}`
                
                // Use quadratic curves for smoother path
                for (let i = 0; i < this.points.length - 1; i++) {
                    const xc = (this.points[i].x + this.points[i + 1].x) / 2
                    const yc = (this.points[i].y + this.points[i + 1].y) / 2
                    path += ` Q ${this.points[i].x} ${this.points[i].y}, ${xc} ${yc}`
                }
                
                // Add final point
                const last = this.points.length - 1
                path += ` L ${this.points[last].x} ${this.points[last].y}`
                
                this.pathData = path
            }
        }
    }
</script>

<style scoped>
    .mouse-trail-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    }

    .trail-svg {
        position: absolute;
        top: 0;
        left: 0;
    }

    .trail-path {
        opacity: 0.9;
    }

    .trail-glow {
        opacity: 0.9;
    }

    .star-head {
        filter: drop-shadow(0 0 2px #2f0b4a);
    }

    .sparkle {
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        pointer-events: none;
        filter: blur(0.5px);
        box-shadow: 0 0 4px currentColor;
    }

    /* Mobile optimization */
    @media (max-width: 767px) {
        .sparkle {
            width: 6px;
            height: 6px;
        }
    }
</style>