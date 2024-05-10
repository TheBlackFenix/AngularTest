import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { GraficaService } from '../../shared/service/grafica.service';
import {
  ApexAxisChartSeries,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { ChartOptions } from '../../shared/types/ChartOptions.type';
import { GraficaData } from '../../shared/models/grafica.interfaces';

@Component({
  selector: 'app-grafica-apex',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './grafica-apex.component.html',
  styleUrl: './grafica-apex.component.css',
})
export default class GraficaApexComponent implements OnInit {
  //Inyecciones
  graficaService = inject(GraficaService);
  //Declaraciones
  loading: boolean = false;
  graficaData: GraficaData[] = [];
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions!: Partial<ChartOptions>;

  ngOnInit(): void {
    this.graficaService.getDatosGrafica().subscribe({
      next: data => {
        this.graficaData = data;
        this.obtenerData();
      },
    });
  }

  obtenerData() {
    //obtener solo los nombres diferentes
    let labels = this.graficaData
      .map(x => x.salesPerson)
      .filter((value, index, self) => self.indexOf(value) === index);
    //obtener solo los meses diferentes
    let months = this.graficaData
      .map(x => x.salesMonth)
      .filter((value, index, self) => self.indexOf(value) === index);
    //obtener los totales de venta de cada personaa por mes debe retornar un [{data: [], label: ''}]
    let datasets = labels.map(label => {
      let data = months.map(month => {
        let total = this.graficaData
          .filter(x => x.salesPerson === label && x.salesMonth === month)
          .reduce((acc, curr) => acc + curr.totalSales, 0);
        return total;
      });
      let dataset = { name: label, data };
      return dataset;
    });
    //convertir los meses a nombres de meses
    let monthString = months.map(month => {
      let date = new Date(2021, month - 1);
      return date.toLocaleString('default', { month: 'long' });
    });
    this.chartOptions = {
      series: datasets,
      chart: { type: 'bar', height: 600 },
      xaxis: { categories: monthString },
      title: { text: 'Ventas por mes' },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          // endingShape: "rounded"
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
    };
    console.log(this.chartOptions);
  }
}
