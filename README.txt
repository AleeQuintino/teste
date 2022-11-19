Envia uma mensagem no whatsapp

Rota: http://127.0.0.1/wpp/send/message
Body: {"number":"553199999999","message":"Hello Word!"}
Headers: Content-Type = application/json

curl --request POST \
  --url http://127.0.0.1/wpp/send/message \
  --header 'Content-Type: application/json' \
  --data '{"number":"553199999999","message":"Hello Word!"}'