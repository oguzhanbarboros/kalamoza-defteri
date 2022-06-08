import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import { data } from 'autoprefixer';
import firma from './firma.css';

const Firma = () => {
  let { id } = useParams();
  const [firma, setfirma] = useState();
  const [alacak, setAlacak] = useState('');
  const [borc, setBorc] = useState('');
  const [aciklama, setAciklama] = useState('');
  const [tarih, setTarih] = useState('');
  const [toplamBorc, setToplamBorc] = useState();
  const [sayi, setSayi] = useState(0);
  let totalAlacak = 0;
  let totalBorc = 0;
  let total = 0;
  let tot = 0;
  let tott = 0;

  const { control, handleSubmit, register } = useForm({
    defaultValues: {},
  });

  const cariSil = (e) => {
    try {
      let existFirmalar = JSON.parse(Cookies.get('firmalar'));

      const currentEleman = existFirmalar.find(
        (firma) => firma.id === parseInt(id)
      );
      const cariElemanList = currentEleman.cari.filter(
        (cari) => cari.id !== parseInt(e)
      );
      currentEleman.cari = cariElemanList;

      //existFirmalar.push(currentEleman);
      setSayi(sayi + 1);
      Cookies.set('firmalar', JSON.stringify(existFirmalar));
      toast.error('Kayıt Silindi');
      // const myTimeout = setTimeout(() => window.location.reload(), 2000);
    } catch (e) {
      toast.info('Silinemedi,sonra tekrar deneyiniz.');

      console.log(e);
    }
  };

  useEffect(() => {
    const firmalar = JSON.parse(Cookies.get('firmalar'));
    setfirma(firmalar.find((firma) => firma.id === parseInt(id)));
  }, [id, borc, sayi]);

  const deneme = JSON.parse(Cookies.get('firmalar'));
  let firmaToplam = deneme.filter((firma) => firma.id === parseInt(id));
  firmaToplam.forEach((i) => {
    i.cari.forEach((i) => {
      totalBorc = parseInt(totalBorc) + parseInt(i.borc);
      totalAlacak = parseInt(totalAlacak) + parseInt(i.alacak);
    });
  });
  total = totalBorc - totalAlacak;
  if (total > 0) {
    tot = 'Toplam ' + total + ' ₺ ' + '  Alacak ';
    tott = '';
  } else {
    tott = 'Toplam ' + total * -1 + ' ₺ ' + ' Borç ';
    tot = '';
  }

  const cariEkle = () => {
    setSayi(sayi + 1);
    if (alacak.length === 0) {
      toast.error('Alacak  boş geçilemez !');
      return;
    }
    if (borc.length === 0) {
      toast.error('Borç boş geçilemez !');
      return;
    }

    let today = new Date();
    let date =
      today.getDate() +
      '/' +
      (today.getMonth() + 1) +
      '/' +
      today.getFullYear();
    try {
      let existFirmalar = JSON.parse(Cookies.get('firmalar'));
      let eklenecekFirma = existFirmalar.find(
        (firma) => firma.id === parseInt(id)
      );

      eklenecekFirma.cari = [
        ...eklenecekFirma.cari,
        {
          alacak,
          borc,
          aciklama,
          tarih: date,
          id: Math.floor(Math.random() * Date.now()),
          cariAdi: eklenecekFirma.firmaAdi,
        },
      ];

      let deletedFirmalar = existFirmalar.filter(
        (firma) => firma.id !== parseInt(id)
      );
      deletedFirmalar.push(eklenecekFirma);
      Cookies.set('firmalar', JSON.stringify(deletedFirmalar));
      toast.success('Başarıyla Eklendi');
      setBorc('');
      setAciklama('');
      setAlacak('');
    } catch (e) {
      toast.error('Ekleme Başarısız.');
      console.log(e);
    }
  };

  const onSubmit = (data) => {
    const newFirma = {
      id: parseInt(id),
      firmaAdi: data.firmaAdi,
      telNo: data.telNo,
      adres: data.adres,
      vergiDairesi: data.vergiDairesi,
      vergiNo: data.vergiNo,
      cari: firma.cari,
    };

    try {
      let existFirmalar = JSON.parse(Cookies.get('firmalar'));
      let deletedFirmalar = existFirmalar.filter(
        (firma) => firma.id !== parseInt(id)
      );
      deletedFirmalar.push(newFirma);
      Cookies.remove('firmalar');
      Cookies.set('firmalar', JSON.stringify(deletedFirmalar));
      toast.success('Firma Başarıyla Güncellendi');
    } catch (e) {
      toast.error('Güncellenme başarısız,sonra tekrar deneyiniz.');

      console.log(e);
    }
  };
  return (
    <div className="font-mono w-screen h-screen">
      <ToastContainer />
      <Header />
      {firma ? (
        <div className="flex py-4 w-full px-16 ">
          <div className="flex flex-col w-[50%] py-12">
            <div className="flex flex-col gap-4 items-center justify-center mb-10">
              <div className="flex flex-col gap-2 items-center justify-center">
                <span>Alacak</span>
                <input
                  className="border-2 border-black"
                  type="number"
                  onChange={(e) => setAlacak(e.target.value)}
                  value={alacak}
                />
              </div>
              <div className="flex flex-col gap-2 items-center justify-center">
                <span>Borç</span>
                <input
                  className="border-2 border-black"
                  type="number"
                  onChange={(e) => setBorc(e.target.value)}
                  value={borc}
                />
              </div>

              <div className="flex flex-col gap-2 items-center justify-center">
                <span>Açıklama</span>
                <input
                  className="border-2 border-black"
                  value={aciklama}
                  onChange={(e) => setAciklama(e.target.value)}
                  type={'text'}
                />
              </div>
              <button
                className="p-2 text-center w-[100px] h-[50px] text-white/90 rounded-xl bg-green-500 hover:scale-105 transition-all"
                onClick={cariEkle}
              >
                Cari Ekle
              </button>
            </div>
            {firma.cari?.map((cari) => (
              <div className="flex flex-row justify-between items-center border-4 p-4 mb-4">
                <div>
                  <p>Alacak : {cari.alacak}</p>
                  <p>Borç : {cari.borc}</p>
                  <p>Açıklama : {cari.aciklama}</p>
                  <p>Tarih : {cari.tarih}</p>
                </div>
                <button
                  onClick={(e) => {
                    cariSil(cari.id);
                  }}
                  className="p-[10px] transition-all font-semibold ease-in-out hover:scale-110 w-[50px] h-[50px] flex items-center justify-center text-center rounded-lg bg-red-600 text-white"
                >
                  Sil
                </button>
              </div>
            ))}
          </div>

          <div className="w-[50%]">
            <form
              className="mt-[50px] flex flex-col justify-center items-center gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="firmaAdi"
                defaultValue={firma.firmaAdi}
                control={control}
                render={({ field }) => (
                  <TextField
                    required
                    id="outlined-basic"
                    label="Firma Adı"
                    variant="outlined"
                    className="w-[400px]"
                    {...field}
                  />
                )}
              />

              <Controller
                name="adres"
                defaultValue={firma.adres}
                control={control}
                render={({ field }) => (
                  <TextField
                    required
                    id="outlined-basic"
                    label="Firma Adres"
                    variant="outlined"
                    className="w-[400px]"
                    {...field}
                  />
                )}
              />
              <Controller
                name="vergiDairesi"
                defaultValue={firma.vergiDairesi}
                control={control}
                render={({ field }) => (
                  <TextField
                    required
                    id="outlined-basic"
                    label=" Vergi Dairesi"
                    variant="outlined"
                    className="w-[400px]"
                    {...field}
                  />
                )}
              />

              <Controller
                name="vergiNo"
                defaultValue={firma.vergiNo}
                control={control}
                render={({ field }) => (
                  <TextField
                    required
                    id="outlined-basic"
                    label="Vergi No"
                    variant="outlined"
                    className="w-[400px]"
                    {...field}
                  />
                )}
              />

              <Controller
                name="telNo"
                defaultValue={firma.telNo}
                control={control}
                render={({ field }) => (
                  <TextField
                    required
                    id="outlined-basic"
                    label="Telefon"
                    variant="outlined"
                    className="w-[400px]"
                    {...field}
                  />
                )}
              />
              <h3 className="underlinee"> {tot}</h3>
              <h3 className="underlinee"> {tott}</h3>
              <input
                className="p-4 bg-green-600 text-[25px] font-serif cursor-pointer rounded-lg text-white transition-all ease-in-out duration-300 hover:scale-110"
                type="submit"
                value="Güncelle"
              />
            </form>
          </div>
        </div>
      ) : (
        'Loading'
      )}
    </div>
  );
};

export default Firma;
