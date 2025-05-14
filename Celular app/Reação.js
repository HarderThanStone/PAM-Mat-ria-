class RainAnimation {
    constructor() {
        this.rainContainer = document.getElementById('rain');
        this.dropCount = Math.floor(window.innerWidth / 8);
        this.activeDrops = 0;
        this.maxDrops = 100;
        this.animationInterval = null;
        
        this.init();
    }
    
    init() {
        this.createInitialDrops();
        this.startAnimationLoop();
        
        window.addEventListener('resize', () => {
            this.dropCount = Math.floor(window.innerWidth / 8);
        });
    }
    
    createInitialDrops() {
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < this.dropCount; i++) {
            this.createDrop(fragment);
        }
        
        this.rainContainer.appendChild(fragment);
    }
    
    createDrop(container = null) {
        if (this.activeDrops >= this.maxDrops) return;
        
        const drop = document.createElement('div');
        drop.className = 'drop';
        
        const posX = Math.random() * 100;
        const duration = 2 + Math.random() * 3;
        const height = 10 + Math.random() * 30;
        const opacity = 0.3 + Math.random() * 0.5;
        
        drop.style.cssText = `
            left: ${posX}%;
            animation-duration: ${duration}s;
            height: ${height}px;
            opacity: ${opacity};
        `;
        
        // Remove a gota quando a animação terminar
        drop.addEventListener('animationend', () => {
            drop.remove();
            this.activeDrops--;
        });
        
        if (container) {
            container.appendChild(drop);
        } else {
            this.rainContainer.appendChild(drop);
        }
        
        this.activeDrops++;
    }
    
    startAnimationLoop() {
        this.animationInterval = setInterval(() => {
            if (this.activeDrops < this.maxDrops) {
                this.createDrop();
            }
        }, 200); // Cria novas gotas a cada 200ms
    }
}

// Inicia a animação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new RainAnimation();
});