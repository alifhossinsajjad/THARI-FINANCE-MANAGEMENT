"use client"

import AccountSetting from '@/components/settingsComponents/AccountSetting'
import AdminTermsPolicy from '@/components/settingsComponents/AdminTermsPolicy'
import PlatformSettings from '@/components/settingsComponents/PlatformSettings'

function SettingPage() {
    return (
        <div>
            <PlatformSettings />
            <AccountSetting />
            <AdminTermsPolicy />
        </div>
    )
}

export default SettingPage