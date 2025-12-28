<template>
  <footer :class="['app-footer', { 'dark-mode': isDarkMode }]">
    <div class="footer-container">
      <!-- Section principale (liens, contact, etc.) -->
      <div class="footer-main">
        <!-- Colonne de gauche - Produits & Ressources -->
        <div class="footer-columns">
          <div class="footer-brand">
            <h3 class="brand-name">Neo-Dash</h3>
            <p class="brand-tagline">Business Platform</p>
            <p class="footer-description">
              {{ config.descriptionEntreprise }}
            </p>
            
            <!-- Mode sombre -->
            <div class="theme-toggle">
              <button @click="toggleDarkMode" class="theme-button" :title="isDarkMode ? 'Passer en mode clair' : 'Passer en mode sombre'">
                <svg v-if="isDarkMode" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.65.25-1.37.36-2.09.36-3.31 0-6-2.69-6-6 0-.72.11-1.44.36-2.09C12.92 3.04 12.46 3 12 3z"/>
                </svg>
                <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                </svg>
                <span>{{ isDarkMode ? 'Mode clair' : 'Mode sombre' }}</span>
              </button>
            </div>
            
            <!-- Réseaux sociaux (liens configurables) -->
            <div class="social-section">
              <div class="social-title">Nous suivre</div>
              <div class="social-links">
                <a 
                  v-if="socialLinks.facebook"
                  :href="socialLinks.facebook" 
                  target="_blank"
                  class="social-link facebook"
                  title="Facebook"
                  rel="noopener noreferrer"
                  :style="{ '--hover-color': '#1877F2' }"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                <a 
                  v-if="socialLinks.twitter"
                  :href="socialLinks.twitter" 
                  target="_blank"
                  class="social-link twitter"
                  title="Twitter/X"
                  rel="noopener noreferrer"
                  :style="{ '--hover-color': '#1DA1F2' }"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                
                <a 
                  v-if="socialLinks.linkedin"
                  :href="socialLinks.linkedin" 
                  target="_blank"
                  class="social-link linkedin"
                  title="LinkedIn"
                  rel="noopener noreferrer"
                  :style="{ '--hover-color': '#0A66C2' }"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                
                <a 
                  v-if="socialLinks.youtube"
                  :href="socialLinks.youtube" 
                  target="_blank"
                  class="social-link youtube"
                  title="YouTube"
                  rel="noopener noreferrer"
                  :style="{ '--hover-color': '#FF0000' }"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Colonne centrale - Liens produits -->
        <div class="footer-columns">
          <div class="footer-column">
            <h4>Produits</h4>
            <ul>
              <li v-for="lien in liens.produits" :key="lien.id">
                <a :href="lien.url" target="_blank" rel="noopener noreferrer">
                  {{ lien.nom }}
                </a>
              </li>
            </ul>
          </div>
          
          <div class="footer-column">
            <h4>Ressources</h4>
            <ul>
              <li v-for="lien in liens.ressources" :key="lien.id">
                <a :href="lien.url" target="_blank" rel="noopener noreferrer">
                  {{ lien.nom }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Colonne droite - Liens entreprise & contact -->
        <div class="footer-columns">
          <div class="footer-column">
            <h4>Entreprise</h4>
            <ul>
              <li v-for="lien in liens.entreprise" :key="lien.id">
                <a :href="lien.url" target="_blank" rel="noopener noreferrer">
                  {{ lien.nom }}
                </a>
              </li>
            </ul>
          </div>
          
          <div class="footer-column">
            <h4>Contact</h4>
            <ul>
              <li v-for="lien in liens.contact" :key="lien.id">
                <a :href="lien.url" target="_blank" rel="noopener noreferrer">
                  {{ lien.nom }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Colonne extrême droite - Contact info -->
        <div class="footer-columns">
          <div class="contact-info">
            <h4>Contact Rapide</h4>
            <div class="contact-details">
              <div class="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                </svg>
                <div>
                  <span class="contact-label">Email</span>
                  <a href="mailto:contact@neostart.com" class="contact-value">contact@neostart.com</a>
                </div>
              </div>
              
              <div class="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <div>
                  <span class="contact-label">Téléphone</span>
                  <a href="tel:+22899887766" class="contact-value">+228 99-88-77-66</a>
                </div>
              </div>
              
              <!-- Sélecteur de langue -->
              <div class="language-selector">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
                </svg>
                <select v-model="langueSelectionnee" @change="changerLangue">
                  <option v-for="langue in languesDisponibles" :key="langue.code" :value="langue.code">
                    {{ langue.nom }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="footer-divider"></div>

      <!-- SECTION BAS - Copyright et liens légaux -->
      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>&copy; {{ anneeEnCours }} NeoStart. Tous droits réservés.</p>
          <p class="footer-meta">
            Construit par notre équipe à Lomé, Togo
          </p>
          <div class="footer-legal">
            <a :href="config.lienMentionLegales" class="legal-link">Mentions légales</a>
            <span class="separator">•</span>
            <a :href="config.lienConfidentialite" class="legal-link">Politique de confidentialité</a>
            <span class="separator">•</span>
            <a :href="config.lienCGU" class="legal-link">Conditions d'utilisation</a>
          </div>
        </div>

        <div class="footer-extras">
          <!-- Retour en haut -->
          <div class="back-to-top" @click="retourHautPage">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
            </svg>
            <span>Haut de page</span>
          </div>

          <!-- Version de l'application -->
          <div class="app-version">
            <span>v{{ config.versionApp }}</span>
          </div>
        </div>
      </div>

      <!-- SECTION TRÈS BAS - Carte Google Maps (seule et large) -->
      <div class="footer-map-section">
        <div class="map-header">
          <h3 class="map-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 10px;">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Notre Siège Social - Lomé, Togo
          </h3>
          <div class="map-actions">
            <button @click="copierAdresse" class="map-action-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
              </svg>
              Copier les coordonnées
            </button>
            <button @click="obtenirItineraire" class="map-action-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Obtenir l'itinéraire
            </button>
          </div>
        </div>
        
        <div class="map-container-large">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1983.0210203003496!2d1.1921365112655815!3d6.189871772137786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2stg!4v1704841234567!5m2!1sfr!2stg" 
            width="100%" 
            height="350" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"
            class="google-map-large"
            title="Localisation NeoStart à Lomé, Togo"
          ></iframe>
          
          <div class="map-overlay-large" @click="ouvrirGoogleMaps">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>Ouvrir dans Google Maps</span>
          </div>
        </div>
        
        <div class="map-info">
          <div class="coordinates">
            <strong>Coordonnées GPS :</strong>
            <code>6.189871772137786, 1.1921365112655815</code>
          </div>
          <div class="map-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 8px;">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Lomé, Togo - Données cartographiques ©2025 Google
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

// Mode sombre
const isDarkMode = ref(false)

// Configuration
const config = reactive({
  nomEntreprise: 'NeoStart',
  descriptionEntreprise: 'Plateforme d\'administration système pour gérer efficacement vos utilisateurs et données.',
  droitsReserves: 'Tous droits réservés.',
  texteRetourHaut: 'Haut de page',
  lienMentionLegales: '/mentions-legales',
  lienConfidentialite: '/confidentialite',
  lienCGU: '/cgu',
  versionApp: '2.1.0'
})

// Liens réseaux sociaux (chargés depuis localStorage)
const socialLinks = reactive({
  facebook: '',
  twitter: '',
  linkedin: '',
  youtube: ''
})

// Coordonnées GPS
const coordinates = {
  lat: 6.189871772137786,
  lng: 1.1921365112655815,
  address: 'Lomé, Togo'
}

// Langues disponibles
const languesDisponibles = [
  { code: 'fr', nom: 'Français' },
  { code: 'en', nom: 'English' }
]

const langueSelectionnee = ref('fr')

// Liens dynamiques
const liens = reactive({
  produits: [
    { id: 1, nom: 'Dashboard Pro', url: '/produits/dashboard' },
    { id: 2, nom: 'Analytics Avancé', url: '/produits/analytics' },
    { id: 3, nom: 'Gestion Utilisateurs', url: '/produits/utilisateurs' },
    { id: 4, nom: 'Système de Reporting', url: '/produits/reporting' },
    { id: 5, nom: 'API & Intégrations', url: '/produits/api' }
  ],
  ressources: [
    { id: 1, nom: 'Documentation', url: '/ressources/doc' },
    { id: 2, nom: 'Blog Tech', url: '/ressources/blog' },
    { id: 3, nom: 'Tutoriels Vidéo', url: '/ressources/tutoriels' },
    { id: 4, nom: 'Centre d\'Aide', url: '/ressources/aide' },
    { id: 5, nom: 'API Reference', url: '/ressources/api-ref' }
  ],
  entreprise: [
    { id: 1, nom: 'À propos', url: '/entreprise/a-propos' },
    { id: 2, nom: 'Carrières', url: '/entreprise/carrieres' },
    { id: 3, nom: 'Presse', url: '/entreprise/presse' },
    { id: 4, nom: 'Blog', url: '/entreprise/blog' },
    { id: 5, nom: 'Événements', url: '/entreprise/evenements' }
  ],
  contact: [
    { id: 1, nom: 'Support', url: 'mailto:support@neostart.com' },
    { id: 2, nom: 'Commercial', url: 'mailto:commercial@neostart.com' },
    { id: 3, nom: 'Partenariats', url: 'mailto:partenariats@neostart.com' },
    { id: 4, nom: 'Contact Général', url: '/contact' },
    { id: 5, nom: 'Status Service', url: '/status' }
  ]
})

// Calcul de l'année en cours
const anneeEnCours = computed(() => new Date().getFullYear())

// Charger les liens sociaux depuis localStorage
const chargerLiensSociaux = () => {
  try {
    const savedLinks = localStorage.getItem('socialLinks')
    if (savedLinks) {
      const parsedLinks = JSON.parse(savedLinks)
      Object.assign(socialLinks, parsedLinks)
    }
  } catch (error) {
    console.error('Erreur lors du chargement des liens sociaux:', error)
  }
}

// Fonctions
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
  localStorage.setItem('darkMode', isDarkMode.value)
  emit('toggle-dark-mode', isDarkMode.value)
}

const ouvrirGoogleMaps = () => {
  const url = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
  window.open(url, '_blank')
}

const obtenirItineraire = () => {
  const url = `https://www.google.com/maps/dir//${coordinates.lat},${coordinates.lng}`
  window.open(url, '_blank')
}

const copierAdresse = async () => {
  const address = `${coordinates.lat}, ${coordinates.lng} - ${coordinates.address}`
  try {
    await navigator.clipboard.writeText(address)
    alert('Coordonnées copiées dans le presse-papier !')
  } catch (err) {
    console.error('Erreur lors de la copie:', err)
    // Fallback pour les anciens navigateurs
    const textArea = document.createElement('textarea')
    textArea.value = address
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    alert('Coordonnées copiées dans le presse-papier !')
  }
}

const telechargerVCard = () => {
  const vCard = `BEGIN:VCARD
VERSION:3.0
FN:NeoStart
ORG:NeoStart
TEL:+228XXXXXXXX
EMAIL:contact@neostart.com
ADR:;;Lomé;;Togo
GEO:${coordinates.lat};${coordinates.lng}
URL:${window.location.origin}
NOTE:${config.descriptionEntreprise}
END:VCARD`

  const blob = new Blob([vCard], { type: 'text/vcard' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'neostart.vcf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

const changerLangue = () => {
  console.log('Langue changée:', langueSelectionnee.value)
  localStorage.setItem('preferredLanguage', langueSelectionnee.value)
  emit('changer-langue', langueSelectionnee.value)
}

const retourHautPage = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Charger les données
const chargerDonnees = async () => {
  try {
    const savedDarkMode = localStorage.getItem('darkMode')
    const savedLang = localStorage.getItem('preferredLanguage')

    if (savedDarkMode !== null) {
      isDarkMode.value = savedDarkMode === 'true'
      document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
    }

    if (savedLang) {
      langueSelectionnee.value = savedLang
    }
  } catch (erreur) {
    console.error('Erreur lors du chargement des données:', erreur)
  }
}

// Événements émis
const emit = defineEmits(['changer-langue', 'toggle-dark-mode'])

// Charger les données au montage
onMounted(() => {
  chargerDonnees()
  chargerLiensSociaux()
})
</script>

<style scoped>
/* Reset et styles de base */
.app-footer {
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  color: #333;
  padding: 60px 0 0;
  border-top: 1px solid #eaeaea;
  position: relative;
  transition: background 0.3s ease, color 0.3s ease;
}

.dark-mode.app-footer {
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  color: #e0e0e0;
  border-top: 1px solid #333;
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
}

/* Section principale */
.footer-main {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 60px;
  margin-bottom: 40px;
}

.footer-columns {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* Footer brand */
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.brand-name {
  font-size: 32px;
  font-weight: 800;
  background: linear-gradient(135deg, #4361ee, #3a0ca3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  line-height: 1.1;
}

.dark-mode .brand-name {
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-tagline {
  font-size: 14px;
  color: #666;
  font-weight: 500;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.dark-mode .brand-tagline {
  color: #999;
}

.footer-description {
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  margin: 0;
}

.dark-mode .footer-description {
  color: #aaa;
}

/* Theme toggle */
.theme-toggle {
  margin: 20px 0;
}

.theme-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 10px;
  color: #555;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  width: 100%;
}

.dark-mode .theme-button {
  background: #333;
  border-color: #444;
  color: #aaa;
}

.theme-button:hover {
  background: #e0e0e0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dark-mode .theme-button:hover {
  background: #444;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.theme-button svg {
  color: #4361ee;
}

.dark-mode .theme-button svg {
  color: #667eea;
}

/* Social section */
.social-section {
  margin-top: 20px;
}

.social-title {
  font-size: 14px;
  font-weight: 600;
  color: #555;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dark-mode .social-title {
  color: #999;
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #555;
  transition: all 0.3s ease;
  text-decoration: none;
}

.dark-mode .social-link {
  background: #333;
  color: #aaa;
}

.social-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: var(--hover-color);
  color: white;
}

.dark-mode .social-link:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Footer columns */
.footer-column h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #222;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dark-mode .footer-column h4 {
  color: #e0e0e0;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column li {
  margin-bottom: 10px;
}

.footer-column a {
  color: #666;
  text-decoration: none;
  transition: all 0.3s;
  font-size: 14px;
  display: inline-block;
}

.dark-mode .footer-column a {
  color: #aaa;
}

.footer-column a:hover {
  color: #4361ee;
  padding-left: 5px;
}

.dark-mode .footer-column a:hover {
  color: #667eea;
}

/* Contact info */
.contact-info h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #222;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dark-mode .contact-info h4 {
  color: #e0e0e0;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.contact-item svg {
  color: #4361ee;
  flex-shrink: 0;
  margin-top: 2px;
}

.dark-mode .contact-item svg {
  color: #667eea;
}

.contact-label {
  display: block;
  font-size: 12px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.dark-mode .contact-label {
  color: #999;
}

.contact-value {
  display: block;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s;
}

.dark-mode .contact-value {
  color: #e0e0e0;
}

.contact-value:hover {
  color: #4361ee;
}

.dark-mode .contact-value:hover {
  color: #667eea;
}

/* Language selector */
.contact-details .language-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #666;
  margin-top: 10px;
}

.dark-mode .contact-details .language-selector {
  color: #999;
}

.language-selector select {
  background: #f8f9fa;
  border: 1px solid #ddd;
  color: #333;
  padding: 8px 32px 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  transition: all 0.3s;
  width: 100%;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
}

.dark-mode .language-selector select {
  background: #333;
  border-color: #444;
  color: #e0e0e0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23e0e0e0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
}

/* Footer divider */
.footer-divider {
  height: 1px;
  background: #eaeaea;
  margin: 40px 0 30px;
  width: 100%;
}

.dark-mode .footer-divider {
  background: #333;
}

/* Footer bottom */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-copyright {
  flex: 1;
}

.footer-copyright p {
  color: #777;
  font-size: 14px;
  margin: 0 0 8px 0;
}

.dark-mode .footer-copyright p {
  color: #999;
}

.footer-meta {
  font-size: 13px;
  color: #777;
  margin: 0 0 15px 0;
}

.dark-mode .footer-meta {
  color: #999;
}

.footer-legal {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.legal-link {
  color: #666;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.3s;
  display: inline-flex;
  align-items: center;
}

.dark-mode .legal-link {
  color: #999;
}

.legal-link:hover {
  color: #4361ee;
}

.dark-mode .legal-link:hover {
  color: #667eea;
}

.separator {
  color: #ccc;
  font-size: 13px;
}

.dark-mode .separator {
  color: #666;
}

/* Footer extras */
.footer-extras {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-end;
}

.back-to-top {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
  padding: 10px 18px;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  border: none;
}

.dark-mode .back-to-top {
  background: #333;
  color: #999;
}

.back-to-top:hover {
  background: #f0f0f0;
  color: #333;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.dark-mode .back-to-top:hover {
  background: #444;
  color: #e0e0e0;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.back-to-top svg {
  transition: transform 0.3s;
}

.back-to-top:hover svg {
  transform: translateY(-2px);
}

.app-version {
  font-size: 13px;
  color: #999;
  padding: 6px 12px;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #eee;
  font-family: 'Courier New', monospace;
}

.dark-mode .app-version {
  background: #333;
  color: #aaa;
  border-color: #444;
}

/* SECTION MAP - En bas, seule et large */
.footer-map-section {
  background: #f8f9fa;
  border-radius: 16px 16px 0 0;
  padding: 30px;
  margin: 0 -32px -60px;
  border-top: 1px solid #eaeaea;
  position: relative;
  z-index: 1;
}

.dark-mode .footer-map-section {
  background: #2a2a2a;
  border-top-color: #333;
}

.map-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 20px;
}

.map-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: #222;
  display: flex;
  align-items: center;
}

.dark-mode .map-title {
  color: #e0e0e0;
}

.map-actions {
  display: flex;
  gap: 12px;
}

.map-action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  color: #666;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
  border: none;
}

.dark-mode .map-action-btn {
  background: #333;
  border-color: #444;
  color: #e0e0e0;
}

.map-action-btn:hover {
  background: #f0f0f0;
  border-color: #ccc;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.dark-mode .map-action-btn:hover {
  background: #444;
  border-color: #555;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.map-action-btn svg {
  color: #4361ee;
}

.dark-mode .map-action-btn svg {
  color: #667eea;
}

/* Large map container */
.map-container-large {
  position: relative;
  width: 100%;
  height: 350px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.google-map-large {
  width: 100%;
  height: 100%;
  border: none;
  filter: grayscale(10%) contrast(110%);
}

.dark-mode .google-map-large {
  filter: grayscale(30%) brightness(0.8) contrast(120%);
}

.map-overlay-large {
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #4361ee, #3a0ca3);
  color: white;
  padding: 12px 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 15px;
  font-weight: 500;
  backdrop-filter: blur(4px);
  box-shadow: 0 6px 20px rgba(67, 97, 238, 0.3);
  z-index: 10;
  border: none;
}

.map-overlay-large:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(67, 97, 238, 0.4);
}

.map-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #eaeaea;
  flex-wrap: wrap;
  gap: 15px;
}

.dark-mode .map-info {
  border-top-color: #333;
}

.coordinates {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #666;
}

.dark-mode .coordinates {
  color: #aaa;
}

.coordinates code {
  background: #f0f0f0;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: #333;
}

.dark-mode .coordinates code {
  background: #333;
  color: #e0e0e0;
}

.map-note {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #888;
  margin: 0;
}

.dark-mode .map-note {
  color: #999;
}

.map-note svg {
  color: #4361ee;
}

.dark-mode .map-note svg {
  color: #667eea;
}

/* Responsive */
@media (max-width: 1200px) {
  .footer-main {
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }
  
  .footer-map-section {
    margin: 0 -20px -60px;
  }
}

@media (max-width: 992px) {
  .footer-main {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .footer-container {
    padding: 0 20px;
  }
  
  .footer-main {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
  }
  
  .footer-extras {
    align-items: flex-start;
    width: 100%;
  }
  
  .footer-legal {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .separator {
    display: none;
  }
  
  .map-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .map-actions {
    width: 100%;
    flex-direction: column;
  }
  
  .map-action-btn {
    width: 100%;
    justify-content: center;
  }
  
  .map-container-large {
    height: 300px;
  }
  
  .map-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .map-overlay-large {
    position: relative;
    top: auto;
    right: auto;
    width: 100%;
    justify-content: center;
    margin-top: 15px;
  }
}

@media (max-width: 480px) {
  .app-footer {
    padding: 40px 0 0;
  }
  
  .footer-main {
    gap: 30px;
  }
  
  .brand-name {
    font-size: 28px;
  }
  
  .map-title {
    font-size: 18px;
  }
  
  .map-container-large {
    height: 250px;
  }
  
  .social-links {
    gap: 8px;
  }
  
  .social-link {
    width: 36px;
    height: 36px;
  }
  
  .theme-button {
    padding: 10px 16px;
  }
}
</style>