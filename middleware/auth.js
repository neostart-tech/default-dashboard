export default function ({ $auth, redirect }) {
  // Si l'utilisateur n'est pas authentifié, rediriger vers login
  if (!$auth.loggedIn) {
    return redirect('/auth/login')
  }
}