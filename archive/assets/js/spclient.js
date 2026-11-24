/* 
Ce fichier est le seul endroit qui connaît l'adresse du projet Supabase.
Si on change de projet, c'est le seul fichier à modifier.
*/

const SUPABASE_URL = "https://urprnboxigkkvqrvpcgb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_AaBtoyCplKoMH1W2n9eoRw_fSVU-LpI";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);