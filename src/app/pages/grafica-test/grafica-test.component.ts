import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { GraficaService } from '../../shared/service/grafica.service';
import { GraficaData } from '../../shared/models/grafica.interfaces';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';

@Component({
  selector: 'app-grafica-test',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './grafica-test.component.html',
  styleUrl: './grafica-test.component.css',
})
export default class GraficaTestComponent implements OnInit {
  // Inyecciones
  graficaService = inject(GraficaService);
  // Declaraciones
  graficaData: GraficaData[] = [];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;
  barChartData!: ChartData<'bar'>;
  public barChartType = 'bar' as const;
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

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
      return { data, label };
    });
    //convertir los meses a nombres de meses
    let monthString = months.map(month => {
      let date = new Date(2021, month - 1);
      return date.toLocaleString('default', { month: 'long' });
    });

    this.barChartData = { labels: monthString, datasets };

    console.log({ labels, months, datasets, data: this.barChartData });
  }
}
