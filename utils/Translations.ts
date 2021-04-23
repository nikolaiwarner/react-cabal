import { LocalizationContextProps } from '../app/types'
import i18n from 'i18n-js'
import React, { createContext } from 'react'

export const LocalizationContext = createContext<Partial<LocalizationContextProps>>({})

const Translations = {
  en: {
    archive_channel_button: 'Archive Channel',
    cabal_settings_copy_key_button: 'Copy Key',
    cabal_settings_invite_header: 'Invite People',
    cabal_settings_invite_body: 'Share this key with others to let them join the cabal.',
    cabal_settings_cabal_name_body:
      'Set a local name for this cabal. Only you can see this.',
    cabal_settings_cabal_name_header: 'Cabal Name',
    cabal_settings_notifications_body:
      'Display a notification for new messages for this cabal when a channel is in the background.',
    cabal_settings_notifications_header: 'Notifications',
    cabal_settings_remove_cabal_body:
      'Press the button below to locally remove this cabal from this client. Messages may still exist on peer clients.',
    cabal_settings_remove_cabal_button: 'Remove Cabal ({{key}}...)',
    cabal_settings_remove_cabal_header: 'Remove this cabal',
    cabal_settings_title: 'Cabal Settings',
    channel_browser_archived_channels_list_title: 'Archived Channels',
    channel_browser_create_channel_button: 'Create a New Channel',
    channel_browser_joinable_channels_list_title: 'Channels you can join',
    channel_browser_joined_channels_list_title: 'Channels you belong to',
    channel_browser_title: 'Browse Channels',
    channel_members_list_header: 'Channel Members',
    channel_panel_header: 'Channel Details',
    channel_topic_placeholder: 'Click to add a topic',
    leave_channel_button: 'Leave Channel',
  },
  es: {
    archive_channel_button: 'Archivar este canal',
    cabal_settings_cabal_name_header: 'Nombre',
    cabal_settings_cabal_name_body:
      'Establezca un nombre local para esto. Solo tú puedes ver esto.',
    cabal_settings_copy_key_button: 'Copiar clave',
    cabal_settings_invite_body:
      'Comparta esta clave con otras personas para que puedan unirse.',
    cabal_settings_invite_header: 'Invitar a la gente',
    cabal_settings_notifications_body:
      'Muestra una notificación para nuevos mensajes para esto cuando un canal está en segundo plano.',
    cabal_settings_notifications_header: 'Notificaciones',
    cabal_settings_remove_cabal_body:
      'Presione el botón de abajo para eliminarlo localmente de este cliente. Es posible que todavía existan mensajes en clientes del mismo nivel.',
    cabal_settings_remove_cabal_header: 'Eliminar',
    cabal_settings_remove_cabal_button: 'Eliminar ({{key}}...)',
    cabal_settings_title: 'Ajustes',
    channel_browser_archived_channels_list_title: 'Canales archivados',
    channel_browser_create_channel_button: 'Crea un nuevo canal',
    channel_browser_joinable_channels_list_title: 'Canales a los que puedes unirte',
    channel_browser_joined_channels_list_title: 'Canales a los que perteneces',
    channel_browser_title: 'Explorar canales',
    channel_members_list_header: 'Miembros del canal',
    channel_panel_header: 'Detalles del canal',
    channel_topic_placeholder: 'Haga clic para agregar un tema',
    leave_channel_button: 'Salir de este canal',
  },
}

i18n.fallbacks = true
i18n.translations = Translations

export default Translations
