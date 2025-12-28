// ~/middleware/guest.js
export default function ({ $auth, redirect }) {
  // Si l'utilisateur est déjà authentifié, rediriger vers dashboard
  if ($auth.loggedIn) {
    return redirect('/dashboard')
  }
}