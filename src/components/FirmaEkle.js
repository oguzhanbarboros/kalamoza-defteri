import React, { useState } from 'react';
import Header from './Header';
import { useForm } from 'react-hook-form';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { data } from '../data.js';
import Cookies from 'js-cookie';

const FirmaEkle = () => {
  const [value, onChange] = useState('10:00');
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({});
  const onSubmit = (data) => {
    const newRandevu = {
      id: Math.floor(Math.random() * Date.now()),
      firmaAdi: data.firmaAdi,

      telNo: data.telNo,
      tcNo: data.tcNo,
      adres: data.adres,
      vergiDairesi: data.vergiDairesi,
      vergiNo: data.vergiNo,
      cari: [],
    };

    if (!Cookies.get('firmalar')) {
      Cookies.set('firmalar', JSON.stringify(data));
    }
    try {
      const existCookie = JSON.parse(Cookies.get('firmalar'));
      const kontrol = existCookie.find(
        (item) => item.firmaAdi === newRandevu.firmaAdi
      );
      if (kontrol) {
        toast.error('Firma kaydı mevcut');
      } else {
        existCookie.push(newRandevu);
        Cookies.set('firmalar', JSON.stringify(existCookie));
        toast.success('Firma Başarıyla Eklendi');
        window.location.reload();
      }
    } catch (e) {
      toast.error(
        'Firma eklenirken bir hata oluştu,sonra tekrar deneyiniz' + e.message
      );
    } finally {
      reset();
    }
  };

  return (
    <div className="font-mono">
      <div className="w-full flex items-center justify-center mt-[20px] ">
        <ToastContainer />
        <form
          className="flex flex-col gap-4 w-[700px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1">
            <span className="font-serif text-sm">Firma Adı</span>
            <input
              className="border-2 border-gray-500"
              {...register('firmaAdi', { required: true })}
            />
            {errors.firmaAdi && (
              <span className="text-[12px] text-red-600">
                Bu alan gereklidir !
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-serif text-sm">Telefon</span>
            <input
              className="border-2 border-gray-500"
              {...register('telNo', { required: true })}
            />
            {errors.telNo && (
              <span className="text-[12px] text-red-600">
                Bu alan gereklidir !
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-serif text-sm">Adres</span>
            <input
              className="border-2 border-gray-500"
              {...register('adres', { required: true })}
            />
            {errors.adres && (
              <span className="text-[12px] text-red-600">
                Bu alan gereklidir !
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-serif text-sm">Vergi Dairesi</span>
            <input
              className="border-2 border-gray-500"
              {...register('vergiDairesi', { required: true })}
            />
            {errors.vergiDairesi && (
              <span className="text-[12px] text-red-600">
                Bu alan gereklidir !
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-serif text-sm">Vergi Numarası</span>
            <input type="number"
              className="border-2 border-gray-500"
              {...register('vergiNo', { required: true })}
            />
            {errors.vergiNo && (
              <span className="text-[12px] text-red-600">
                Bu alan gereklidir !
              </span>
            )}
          </div>

          <input
            className="text-[24px]  bg-black/100 text-white cursor-pointer hover:scale-90 transition-all ease-in-out p-2"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default FirmaEkle;
