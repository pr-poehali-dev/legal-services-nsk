/**
 * Утилита для отправки WhatsApp сообщений через Green API
 */

const GREENAPI_CONFIG = {
  apiUrl: 'https://3100.api.green-api.com/v3',
  mediaUrl: 'https://3100.api.green-api.com/v3',
  idInstance: '3100445356',
  apiTokenInstance: 'ced349362db7404d8b038631d7e61c14ab7e4530efa541c7ac',
  phone: '79994523500'
};

interface SendMessageParams {
  phone: string;
  message: string;
}

interface SendMessageResponse {
  success: boolean;
  idMessage?: string;
  error?: string;
}

/**
 * Отправка текстового сообщения в WhatsApp
 */
export async function sendWhatsAppMessage(params: SendMessageParams): Promise<SendMessageResponse> {
  try {
    const { phone, message } = params;
    
    // Очищаем номер от всех символов кроме цифр
    let cleanPhone = phone.replace(/\D/g, '');
    
    // Если номер начинается с 8, заменяем на 7
    if (cleanPhone.startsWith('8')) {
      cleanPhone = '7' + cleanPhone.substring(1);
    }
    
    // Добавляем код страны если его нет
    if (!cleanPhone.startsWith('7')) {
      cleanPhone = '7' + cleanPhone;
    }
    
    // Формируем chatId для WhatsApp
    const chatId = `${cleanPhone}@c.us`;
    
    // URL для отправки сообщения
    const url = `${GREENAPI_CONFIG.apiUrl}/waInstance${GREENAPI_CONFIG.idInstance}/sendMessage/${GREENAPI_CONFIG.apiTokenInstance}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatId,
        message
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Green API error:', errorText);
      return {
        success: false,
        error: `Ошибка отправки: ${response.status}`
      };
    }
    
    const data = await response.json();
    
    return {
      success: true,
      idMessage: data.idMessage
    };
    
  } catch (error) {
    console.error('WhatsApp send error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Неизвестная ошибка'
    };
  }
}

/**
 * Отправка уведомления о новой заявке юристу
 */
export async function sendConsultationNotification(params: {
  name: string;
  phone: string;
  service?: string;
}): Promise<SendMessageResponse> {
  const message = `🔔 *Новая заявка на консультацию*

👤 Имя: ${params.name}
📱 Телефон: ${params.phone}
${params.service ? `📋 Услуга: ${params.service}` : ''}

⏰ Время: ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Novosibirsk' })}

_Сообщение от ЮрСервис НСК_`;

  return sendWhatsAppMessage({
    phone: GREENAPI_CONFIG.phone,
    message
  });
}

/**
 * Открыть чат WhatsApp с предзаполненным сообщением
 */
export function openWhatsAppChat(message?: string): void {
  const phone = GREENAPI_CONFIG.phone;
  const encodedMessage = message ? encodeURIComponent(message) : '';
  const url = `https://wa.me/${phone}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
  
  window.open(url, '_blank');
}

export default {
  sendWhatsAppMessage,
  sendConsultationNotification,
  openWhatsAppChat,
  config: GREENAPI_CONFIG
};
