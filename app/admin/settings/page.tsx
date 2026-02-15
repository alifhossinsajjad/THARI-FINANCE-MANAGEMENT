"use client"

import AccountSetting from '@/components/settingsComponents/AccountSetting'
import AdminConfig from '@/components/settingsComponents/AdminConfig'
import AdminTermsPolicy from '@/components/settingsComponents/AdminTermsPolicy'
import PlatformSettings from '@/components/settingsComponents/PlatformSettings'

function SettingPage() {
    return (
        <div>
            <PlatformSettings />
            <AccountSetting />
            <AdminTermsPolicy />
            <AdminConfig />
        </div>
    )
}

export default SettingPage