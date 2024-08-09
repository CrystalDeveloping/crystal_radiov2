ESX = exports["es_extended"]:getSharedObject()  

CreateThread(function()
    ESX.RegisterUsableItem('radio', function(playerId)
        TriggerClientEvent('apri:radio', playerId)
    end)
end)