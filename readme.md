# GPT for Communities

NomadAI, Circle Community API'yi kullanarak topluluk gönderilerini alır, onları güvenli bir şekilde özetler, vektörlere dönüştürür ve Upstash Vector veritabanında saklar. Proje, Node.js üzerinde çalışır ve bir ChatGPT modeliyle beslenen veri tabanından bilgileri besler.

## Kurulum

Projeyi kurmak ve çalıştırmak için aşağıdaki adımları takip edin:

1. **Fly.io ve Upstash Hesapları Oluşturun**: Projeyi barındırmak için Fly.io'ya, vektör veritabanı için de Upstash'a kaydolun.

2. **Circle API Token Oluşturun**: Circle Community'den bir API tokeni alın.

3. **Proje Ayarlarını Yapın**: Projeyi forklayın ve gerekli anahtarları (`CIRCLE_COMMUNITY_ID`, `CIRCLE_TOKEN`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) ortam değişkenleri olarak ayarlayın.

4. **Fly.io'ya Projeyi Dağıtın**: Projeyi Fly.io'ya dağıtın.

5. **GPT Modelini Yapılandırın ve Oluşturun**: Veritabanından beslenen ChatGPT modelini yapılandırın ve oluşturun.

## Kullanım Örnekleri

## Lisans
