
import { useState } from 'react';
import styles from './styles.module.css';

export default function Home() {
  const [formData, setFormData] = useState({
    area: '',
    bedrooms: '',
    bathrooms: '',
    stories: '',
    mainroad: '',
    guestroom: '',
    basement: '',
    hotwaterheating: '',
    airconditioning: '',
    parking: '',
    prefarea: '',
    furnishingstatus: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCalculate = async () => {
    try {
      const response = await fetch('http://localhost:3001', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('HTTP error! ' + response.status);
      }

      const result = await response.json();
      console.log('Ev fiyatı tahmini:', result.homePrice);
    } catch (error) {
      console.error('Ev fiyatı tahmini yapılamadı:', error);
    }
  };
import Header from '@/components/Headers'
import { verifyJwtToken } from '@/utils/verifyJwtToken';
import { getSession } from 'next-auth/react';
import React from 'react'
main

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}></div>
      <div className={styles.form}>
      
      
        <label>
          Alan:
          <input type="text" name="area" value={formData.area} onChange={handleInputChange} />
        </label>
        <label>
          Yatak Odası Sayısı:
          <input type="text" name="bedrooms" value={formData.bedrooms} onChange={handleInputChange} />
        </label>
        <label>
          Banyo Sayısı:
          <input type="text" name="bathrooms" value={formData.bathrooms} onChange={handleInputChange} />
        </label>
        <label>
          Kat Sayısı:
          <input type="text" name="stories" value={formData.stories} onChange={handleInputChange} />
        </label>
        <label>
          Ana Yol Üzerinde Mi?
          <select name="mainroad" value={formData.mainroad} onChange={handleInputChange}>
            <option value="">Seçiniz</option>
            <option value="Evet">Evet</option>
            <option value="Hayır">Hayır</option>
          </select>
        </label>
        <label>
          Misafir Odası Var Mı?
          <select name="guestroom" value={formData.guestroom} onChange={handleInputChange}>
            <option value="">Seçiniz</option>
            <option value="Evet">Evet</option>
            <option value="Hayır">Hayır</option>
          </select>
        </label>
        <label>
          Bodrum Var Mı?
          <select name="basement" value={formData.basement} onChange={handleInputChange}>
            <option value="">Seçiniz</option>
            <option value="Evet">Evet</option>
            <option value="Hayır">Hayır</option>
          </select>
        </label>
        <label>
          Sıcak Su Isıtma Var Mı?
          <select name="hotwaterheating" value={formData.hotwaterheating} onChange={handleInputChange}>
            <option value="">Seçiniz</option>
            <option value="Evet">Evet</option>
            <option value="Hayır">Hayır</option>
          </select>
        </label>
        <label>
          Klima Var Mı?
          <select name="airconditioning" value={formData.airconditioning} onChange={handleInputChange}>
            <option value="">Seçiniz</option>
            <option value="Evet">Evet</option>
            <option value="Hayır">Hayır</option>
          </select>
        </label>
        <label>
          Park Yeri Var Mı?
          <select name="parking" value={formData.parking} onChange={handleInputChange}>
            <option value="">Seçiniz</option>
            <option value="Evet">Evet</option>
            <option value="Hayır">Hayır</option>
          </select>
        </label>
        <label>
          Tercih Edilen Bölge?
          <select name="prefarea" value={formData.prefarea} onChange={handleInputChange}>
            <option value="">Seçiniz</option>
            <option value="Evet">Evet</option>
            <option value="Hayır">Hayır</option>
          </select>
        </label>
        <label>
          Mobilya Durumu?
          <select name="furnishingstatus" value={formData.furnishingstatus} onChange={handleInputChange}>
            <option value="">Seçiniz</option>
            <option value="Evet">Evet</option>
            <option value="Hayır">Hayır</option>
          </select>
        </label>
        <button className={styles.calculateButton} onClick={handleCalculate}>
          Hesapla
        </button>
      </div>
    </div>
  );
}

