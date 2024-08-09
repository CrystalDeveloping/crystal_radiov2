local isopened

RegisterNetEvent('apri:radio')
AddEventHandler('apri:radio', function ()
    if not isopened then
        SetNuiFocus(true, true)
        SendNUIMessage({
            action = 'showRadio',
        })
        isopened = true
    else
        SetNuiFocus(false, false)
        SendNUIMessage({
            action = 'hideRadio',
        })
        isopened = false
    end
end)

RegisterNUICallback("close", function(data)
    SetNuiFocus(false, false)
    isopened = false
end)

RegisterNUICallback('submitNumber', function(data, cb)
    local numberValue = tonumber(data.number)

    if numberValue >= Config.maxFrenquenze then
        TriggerEvent('crystal:showNotify', 'Radio', 'error', 'la massima frequenza è ' .. Config.maxFrenquenze .. ', tu hai digitato ' .. numberValue)
    else
        exports["pma-voice"]:setRadioChannel(numberValue)
    end

    cb({status = 'ok'})
end)

RegisterNUICallback('accendiRadio', function(data, cb)

    SendNUIMessage({
        action = 'accendiRadio'
    })

    cb({status = 'ok'})
end)

RegisterNUICallback('lasciaradio', function(data, cb)

    exports['pma-voice']:removePlayerFromRadio()

    cb({status = 'ok'})
end)

RegisterNUICallback("alzavolume", function(data, cb)
    local volume = exports['pma-voice']:getRadioVolume()
	exports["pma-voice"]:setRadioVolume(volume + 5)
    cb('ok')
end)

RegisterNUICallback("abbassavolume", function(data, cb)
    local volume = exports['pma-voice']:getRadioVolume()
	exports["pma-voice"]:setRadioVolume(volume - 5)
    cb('ok')
end)