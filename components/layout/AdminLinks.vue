<template>
  <div class="admin-links">
    <div class="admin-container">
      <h2>Gestion des liens du footer</h2>
      
      <!-- Ajouter un nouveau lien -->
      <div class="add-link-form">
        <h3>Ajouter un nouveau lien</h3>
        <div class="form-group">
          <label>Section:</label>
          <select v-model="newLink.section">
            <option value="produits">Produits</option>
            <option value="ressources">Ressources</option>
            <option value="entreprise">Entreprise</option>
            <option value="contact">Contact</option>
          </select>
        </div>
        <div class="form-group">
          <label>Nom du lien:</label>
          <input v-model="newLink.nom" type="text" placeholder="Ex: Facebook" />
        </div>
        <div class="form-group">
          <label>URL:</label>
          <input v-model="newLink.url" type="text" placeholder="Ex: https://facebook.com/" />
        </div>
        <button @click="ajouterLien" class="btn-add">Ajouter le lien</button>
      </div>

      <!-- Ajouter un réseau social -->
      <div class="add-social-form">
        <h3>Ajouter un réseau social</h3>
        <div class="form-group">
          <label>Nom:</label>
          <input v-model="newSocial.nom" type="text" placeholder="Ex: facebook" />
        </div>
        <div class="form-group">
          <label>Nom complet:</label>
          <input v-model="newSocial.nomComplet" type="text" placeholder="Ex: Facebook" />
        </div>
        <div class="form-group">
          <label>URL:</label>
          <input v-model="newSocial.url" type="text" placeholder="Ex: https://facebook.com/" />
        </div>
        <div class="form-group">
          <label>Couleur au survol (HEX):</label>
          <input v-model="newSocial.couleur" type="color" />
        </div>
        <button @click="ajouterReseau" class="btn-add">Ajouter le réseau</button>
      </div>

      <!-- Liste des liens existants -->
      <div class="links-list">
        <h3>Liens existants</h3>
        <div v-for="section in liens" :key="section.id" class="section">
          <h4>{{ section.titre }}</h4>
          <div v-for="lien in section.items" :key="lien.id" class="link-item">
            <span>{{ lien.nom }}</span>
            <span class="url">{{ lien.url }}</span>
            <button @click="supprimerLien(section.id, lien.id)" class="btn-delete">Supprimer</button>
          </div>
        </div>
      </div>

      <!-- Liste des réseaux sociaux -->
      <div class="socials-list">
        <h3>Réseaux sociaux</h3>
        <div v-for="reseau in reseauxSociaux" :key="reseau.id" class="social-item">
          <span>{{ reseau.nomComplet }}</span>
          <span class="url">{{ reseau.url }}</span>
          <button @click="supprimerReseau(reseau.id)" class="btn-delete">Supprimer</button>
        </div>
      </div>

      <!-- Boutons d'action -->
      <div class="actions">
        <button @click="sauvegarder" class="btn-save">Sauvegarder les modifications</button>
        <button @click="reinitialiser" class="btn-reset">Réinitialiser aux valeurs par défaut</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Référence au composant footer (sera injecté via le parent)
const footerRef = ref(null)

const newLink = ref({
  section: 'produits',
  nom: '',
  url: ''
})

const newSocial = ref({
  nom: '',
  nomComplet: '',
  url: '',
  couleur: '#1877F2'
})

const liens = ref([])
const reseauxSociaux = ref([])

// Charger les données depuis le localStorage
const chargerDonnees = () => {
  const liensSauvegardes = localStorage.getItem('footer_liens')
  const reseauxSauvegardes = localStorage.getItem('footer_reseaux')
  
  if (liensSauvegardes) {
    liens.value = JSON.parse(liensSauvegardes)
  }
  
  if (reseauxSauvegardes) {
    reseauxSociaux.value = JSON.parse(reseauxSauvegardes)
  }
}

const ajouterLien = () => {
  if (!newLink.value.nom || !newLink.value.url) {
    alert('Veuillez remplir tous les champs')
    return
  }

  const section = liens.value.find(s => s.id === newLink.value.section)
  if (section) {
    section.items.push({
      id: Date.now(),
      nom: newLink.value.nom,
      url: newLink.value.url
    })
    
    // Réinitialiser le formulaire
    newLink.value.nom = ''
    newLink.value.url = ''
  }
}

const ajouterReseau = () => {
  if (!newSocial.value.nom || !newSocial.value.url) {
    alert('Veuillez remplir tous les champs')
    return
  }

  reseauxSociaux.value.push({
    id: Date.now(),
    nom: newSocial.value.nom,
    nomComplet: newSocial.value.nomComplet || newSocial.value.nom,
    url: newSocial.value.url,
    couleur: newSocial.value.couleur,
    icone: ''
  })

  // Réinitialiser le formulaire
  newSocial.value = {
    nom: '',
    nomComplet: '',
    url: '',
    couleur: '#1877F2'
  }
}

const supprimerLien = (sectionId, lienId) => {
  const section = liens.value.find(s => s.id === sectionId)
  if (section) {
    section.items = section.items.filter(l => l.id !== lienId)
  }
}

const supprimerReseau = (reseauId) => {
  reseauxSociaux.value = reseauxSociaux.value.filter(r => r.id !== reseauId)
}

const sauvegarder = () => {
  localStorage.setItem('footer_liens', JSON.stringify(liens.value))
  localStorage.setItem('footer_reseaux', JSON.stringify(reseauxSociaux.value))
  
  // Rafraîchir la page pour voir les changements
  window.location.reload()
}

const reinitialiser = () => {
  if (confirm('Êtes-vous sûr de vouloir réinitialiser tous les liens ?')) {
    localStorage.removeItem('footer_liens')
    localStorage.removeItem('footer_reseaux')
    window.location.reload()
  }
}

onMounted(() => {
  chargerDonnees()
})
</script>

<style scoped>
.admin-links {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.admin-container h2 {
  margin-bottom: 2rem;
  color: #333;
}

.add-link-form,
.add-social-form,
.links-list,
.socials-list {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

h3, h4 {
  color: #333;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.btn-add,
.btn-delete,
.btn-save,
.btn-reset {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.btn-add {
  background: #4CAF50;
  color: white;
}

.btn-add:hover {
  background: #45a049;
}

.btn-delete {
  background: #f44336;
  color: white;
  margin-left: 1rem;
}

.btn-delete:hover {
  background: #d32f2f;
}

.btn-save {
  background: #2196F3;
  color: white;
  margin-right: 1rem;
}

.btn-save:hover {
  background: #1976D2;
}

.btn-reset {
  background: #ff9800;
  color: white;
}

.btn-reset:hover {
  background: #f57c00;
}

.section {
  margin-bottom: 1.5rem;
}

.link-item,
.social-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background: white;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  border: 1px solid #eee;
}

.link-item span,
.social-item span {
  flex: 1;
}

.url {
  color: #666;
  font-size: 0.9rem;
  font-family: monospace;
}

.actions {
  margin-top: 2rem;
  text-align: center;
}
</style>