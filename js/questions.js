// ISO 358 Questions Database with Official Professor Solutions
window.BASE_QUESTIONS = [
  {
    "t": "T1",
    "q": "El sistema operativo toma el control de la CPU:",
    "opts": [
      "Cuando se produce una llamada al sistema, una excepción o una interrupción.",
      "Cuando se produce una llamada al sistema o una interrupción, pero no en caso de excepción, dado que en esta situación el hardware aborta directamente el programa."
    ],
    "ans": 0,
    "ex": "El SO toma el control en los tres casos: llamadas al sistema (software), excepciones (errores de programa) e interrupciones (eventos hardware). En ninguno de los tres el hardware 'aborta directamente' sin intervención del SO.",
    "id": "base_1",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T1",
    "q": "La característica del hardware en la que se apoya directamente el sistema operativo para impedir que un proceso se quede con la CPU por tiempo indefinido es:",
    "opts": [
      "La disponibilidad de dos modos de funcionamiento (modo núcleo y modo usuario) en la CPU.",
      "Las interrupciones periódicas generadas por alguno de los relojes hardware con que debe contar el sistema."
    ],
    "ans": 1,
    "ex": "Es el temporizador (timer) hardware el que genera interrupciones periódicas. Cuando vence el quantum, el SO recupera el control. Los dos modos de CPU sirven para protección, pero no para limitar el tiempo de uso.",
    "id": "base_2",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T1",
    "q": "El mecanismo de los buffers que permite el solapamiento de la E/S de un programa con el cómputo del mismo programa requiere de la utilización de:",
    "opts": [
      "Un dispositivo de acceso aleatorio, como un disco, para ir depositando en una zona concreta del mismo los datos que se van calculando.",
      "Una zona concreta de memoria desde donde ir obteniendo los datos que se van necesitando."
    ],
    "ans": 1,
    "ex": "Los buffers son zonas de memoria principal (RAM). El proceso escribe datos en el buffer mientras el SO o el hardware de E/S los transfiere al dispositivo de forma asíncrona, solapando cómputo y E/S.",
    "id": "base_3",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T1",
    "q": "Con respecto a la ejecución del intérprete de órdenes bash:",
    "opts": [
      "Se realiza en modo usuario del procesador puesto que para el núcleo del sistema operativo su ejecución no difiere de la de cualquier otra aplicación de usuario.",
      "Se realiza en modo núcleo del procesador puesto que forma parte del núcleo del sistema operativo."
    ],
    "ans": 0,
    "ex": "bash es un proceso de usuario normal. El núcleo del SO no distingue bash de cualquier otro programa: ambos ejecutan en modo usuario y acceden al SO mediante llamadas al sistema.",
    "id": "base_4",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T1",
    "q": "En un sistema operativo basado en micronúcleo (organización cliente-servidor), es cierto que:",
    "opts": [
      "Tanto los procesos de tipo cliente como los de tipo servidor se ejecutan con el procesador en modo usuario.",
      "Tanto el micronúcleo como los procesos de tipo servidor se ejecutan con el procesador en modo núcleo."
    ],
    "ans": 0,
    "ex": "En la arquitectura micronúcleo el micronúcleo (mínimo) ejecuta en modo núcleo; los servidores y los clientes ejecutan en modo usuario. Esta es la clave de su diseño modular y seguro.",
    "id": "base_5",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T1",
    "q": "Un sistema operativo necesita obligatoriamente el apoyo del hardware para:",
    "opts": [
      "Impedir que un proceso se apodere de la CPU.",
      "Ser multiusuario cuando el propio sistema operativo es ya multitarea."
    ],
    "ans": 0,
    "ex": "Para evitar que un proceso monopolice la CPU se necesita un temporizador hardware que genere interrupciones periódicas. Ser multiusuario es una decisión de diseño del SO que no requiere soporte HW adicional.",
    "id": "base_6",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T1",
    "q": "Decimos que un sistema operativo se puede ver como una máquina extendida o virtual porque:",
    "opts": [
      "Oculta los detalles del hardware real y presenta una nueva interfaz de la máquina que se usa a través de llamadas al sistema.",
      "Además de permitir el acceso directo a bajo nivel al hardware de la máquina por parte de los procesos en modo usuario, ofrece abstracciones adicionales."
    ],
    "ans": 0,
    "ex": "El SO actúa como capa de abstracción: oculta el hardware y expone una interfaz uniforme (llamadas al sistema) más sencilla y portable. Los procesos en modo usuario NO tienen acceso directo al hardware.",
    "id": "base_7",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T1",
    "q": "En cuanto a la multitarea es cierto que:",
    "opts": [
      "Su objetivo es solapar los tiempos de espera de los procesos de un usuario con el uso de la CPU de otros procesos pertenecientes al mismo usuario.",
      "Trata de dar la ilusión al usuario de que su programa es el único que se está ejecutando, cuando en realidad la CPU puede estar procesando varios programas de distintos usuarios."
    ],
    "ans": 1,
    "ex": "La multitarea (time-sharing) conmuta rápidamente entre procesos para dar a cada usuario la ilusión de que dispone de la CPU en exclusiva. La multiprogramación es la que busca solapar E/S con cómputo.",
    "id": "base_8",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T1",
    "q": "De manera general, un sistema operativo lo podemos ver como controlador de recursos porque:",
    "opts": [
      "Oculta el funcionamiento del hardware al usuario, mostrándole una interfaz más sencilla y amigable.",
      "Proporciona una asignación controlada de los procesadores, memoria, dispositivos de E/S, etc., a los distintos procesos que compiten por ellos."
    ],
    "ans": 1,
    "ex": "El SO como gestor de recursos se encarga de repartirlos de forma eficiente y ordenada entre los procesos que los solicitan. La visión de máquina extendida es la otra gran perspectiva del SO.",
    "id": "base_9",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T1",
    "q": "Las llamadas al sistema:",
    "opts": [
      "Son programas que acompañan al sistema operativo para ofrecer un entorno más cómodo para el desarrollo y ejecución de programas.",
      "Definen la interfaz entre el sistema operativo y un programa en ejecución."
    ],
    "ans": 1,
    "ex": "Las llamadas al sistema (system calls) son la API del SO: la forma en que los procesos de usuario solicitan servicios al núcleo. No son programas independientes, sino el mecanismo de comunicación proceso↔SO.",
    "id": "base_10",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T1",
    "q": "El pseudoparalelismo:",
    "opts": [
      "Consiste en ejecutar varios procesos simultáneamente gracias a tener varias CPUs y/o una CPU con varios núcleos.",
      "Se da cuando cada núcleo de la CPU es utilizado por varios procesos, pasando la ejecución de uno a otro rápidamente."
    ],
    "ans": 1,
    "ex": "El pseudoparalelismo es la ilusión de paralelismo en una CPU con un solo núcleo: la CPU conmuta tan rápido entre procesos que parece que todos ejecutan a la vez. El paralelismo real requiere varios núcleos o CPUs.",
    "id": "base_11",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "En un sistema operativo UNIX, la ejecución de la llamada al sistema fork() por parte de un proceso:",
    "opts": [
      "Crea un proceso hijo que es idéntico al proceso que ejecuta la llamada, salvo que se le pase como argumento un binario, en cuyo caso lo usará para establecer el código del hijo.",
      "Crea siempre un proceso hijo que es idéntico al proceso que ejecuta la llamada al sistema, si bien el PID del padre y del hijo son diferentes."
    ],
    "ans": 1,
    "ex": "fork() NO acepta un binario como argumento; eso es exec(). fork() siempre crea una copia idéntica del proceso padre. La única diferencia inmediata es que el hijo recibe un PID distinto y fork() devuelve 0 al hijo y el PID del hijo al padre.",
    "id": "base_12",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "En UNIX, cuando un proceso P realiza una llamada al sistema y hasta que comienza a ejecutarse el código del SO se producen:",
    "opts": [
      "Un cambio de modo y un cambio de contexto.",
      "Un cambio de proceso, un cambio de modo y un cambio de contexto."
    ],
    "ans": 0,
    "ex": "Al hacer una syscall el MISMO proceso continúa ejecutando, pero en modo núcleo. Se produce: (1) cambio de modo usuario→núcleo y (2) cambio de contexto (guardado de registros). NO hay cambio de proceso: el proceso que ejecuta la syscall sigue siendo el mismo.",
    "id": "base_13",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "Un ejemplo de terminación voluntaria de un proceso como consecuencia de un error sería:",
    "opts": [
      "Que el proceso compruebe que el número de argumentos pasados no es el requerido y no pueda continuar con la ejecución.",
      "Que el proceso trate de realizar un acceso a memoria a una dirección para la cual no tenga permiso."
    ],
    "ans": 0,
    "ex": "La terminación VOLUNTARIA ocurre cuando el propio proceso llama a exit() al detectar un error lógico (p.ej., argumentos incorrectos). El acceso inválido a memoria provoca una excepción que el HARDWARE/SO detecta y termina el proceso involuntariamente.",
    "id": "base_14",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "En cuanto a los estados en los que puede estar un proceso, es cierto que:",
    "opts": [
      "Un proceso P podría pasar directamente del estado 'Bloqueado Suspendido' al estado 'Saliente'.",
      "Un proceso P podría pasar directamente del estado 'Bloqueado' a 'En ejecución' cuando la cola de procesos listos estuviese vacía."
    ],
    "ans": 0,
    "ex": "Un proceso Bloqueado Suspendido puede ser eliminado directamente (pasando a Saliente) por decisión del SO. En cambio, Bloqueado→En ejecución directo NO está permitido: un proceso bloqueado primero se desbloquea (pasa a Listo) y después el planificador le asigna la CPU.",
    "id": "base_15",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "Un proceso en estado 'Bloqueado Suspendido' cambiará de estado:",
    "opts": [
      "Únicamente cuando el planificador a medio plazo (PMP) así lo decida.",
      "Cuando el planificador a medio plazo (PMP) así lo decida o cuando ocurra el evento de E/S que estaba esperando."
    ],
    "ans": 1,
    "ex": "Cuando ocurre el evento E/S que el proceso esperaba, pasa de Bloqueado Suspendido a Listo Suspendido sin que el PMP intervenga en esa transición. El PMP decide si traer el proceso a memoria (Listo Suspendido→Listo).",
    "id": "base_16",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "En cuanto a los estados de un proceso, es cierto que:",
    "opts": [
      "Para que un proceso en 'Bloqueado Suspendido' pueda usar la CPU, tiene que pasar antes por otros dos estados diferentes.",
      "Para que un proceso en 'Listo Suspendido' pueda usar la CPU, tiene que pasar antes por otros dos estados diferentes."
    ],
    "ans": 0,
    "ex": "Bloqueado Suspendido → Listo Suspendido → Listo → Ejecución: 2 estados intermedios (correcto). Listo Suspendido → Listo → Ejecución: solo 1 estado intermedio (incorrecto para la opción b).",
    "id": "base_17",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "En cuanto a la tabla de procesos:",
    "opts": [
      "Tiene una entrada por cada proceso en estado 'Listo', pero no para los procesos en 'Listo Suspendido' o 'Bloqueado Suspendido'.",
      "Tiene una entrada por cada uno de los procesos con independencia del estado en el que se encuentren."
    ],
    "ans": 1,
    "ex": "La tabla de procesos tiene una entrada por CADA proceso existente en el sistema, independientemente de su estado actual. Sin esa entrada, el SO no podría gestionar ni recuperar el proceso.",
    "id": "base_18",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "En cuanto al bloque de control de un proceso (BCP/PCB), es cierto que:",
    "opts": [
      "Almacena los valores de los registros de la CPU tal y como estaban la última vez que al proceso se le quitó la CPU.",
      "Almacena los datos de la pila del proceso tal y como estaban la última vez que al proceso se le quitó la CPU."
    ],
    "ans": 0,
    "ex": "El BCP guarda el contexto del procesador (registros, PC, SP, flags...) de la última vez que el proceso fue desalojado. La pila reside en la memoria del proceso; el BCP solo guarda el puntero de pila (SP).",
    "id": "base_19",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "En UNIX, si dos procesos P y Q realizan una llamada al sistema en el mismo instante:",
    "opts": [
      "Primero se completará la llamada de uno y después la del otro; con una sola copia del SO nunca se simultanea la ejecución de dos llamadas al sistema.",
      "Ambas llamadas al sistema podrían ejecutarse simultáneamente (o concurrentemente)."
    ],
    "ans": 1,
    "ex": "Los kernels UNIX modernos son reentrantes: con múltiples CPUs dos syscalls pueden ejecutarse en paralelo. Con una sola CPU pueden ejecutarse de forma concurrente (intercalada). La misma copia del SO puede atender varias llamadas simultáneas.",
    "id": "base_20",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "Dado un proceso P con dos hilos H1 y H2, podemos decir que:",
    "opts": [
      "H1 y H2 van a ser exactamente iguales, ejecutando las mismas instrucciones con los mismos datos.",
      "H1 y H2 comparten los datos del proceso pero pueden ejecutar instrucciones diferentes."
    ],
    "ans": 1,
    "ex": "Los hilos de un mismo proceso comparten el espacio de direcciones (datos, heap, código), pero cada hilo tiene su propia pila y contador de programa, por lo que pueden ejecutar funciones distintas con datos distintos.",
    "id": "base_21",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "La CPU podrá pasar de ejecutar H1 a H2 (hilos de un mismo proceso) sin la intervención del SO:",
    "opts": [
      "Cuando los hilos estén implementados a nivel usuario.",
      "Cuando los hilos estén implementados en el núcleo del sistema operativo."
    ],
    "ans": 0,
    "ex": "Con hilos a nivel usuario, el cambio de hilo lo gestiona la biblioteca de hilos en espacio de usuario, sin que el SO intervenga. Con hilos de núcleo, el SO es quien decide cuándo cambiar de hilo mediante su planificador.",
    "id": "base_22",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "Un proceso con 4 hilos en una CPU con 4 núcleos: los 4 hilos podrán ejecutarse simultáneamente:",
    "opts": [
      "Solamente si se implementa soporte para los hilos a nivel de núcleo en el sistema operativo.",
      "Siempre, independientemente de cómo estén implementados los hilos."
    ],
    "ans": 0,
    "ex": "Los hilos de usuario son invisibles para el SO y se multiplexan sobre el único proceso que el SO gestiona, por lo que no pueden ejecutarse en paralelo en distintos núcleos. Solo los hilos de núcleo pueden planificarse en varios cores simultáneamente.",
    "id": "base_23",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "Para un planificador cuya meta es maximizar la eficiencia en el uso de la CPU:",
    "opts": [
      "Es más conveniente usar un algoritmo de planificación apropiativo.",
      "Es más conveniente usar un algoritmo de planificación no apropiativo."
    ],
    "ans": 1,
    "ex": "Un algoritmo no apropiativo reduce los cambios de contexto (que consumen tiempo de CPU). El proceso usa la CPU hasta que se bloquea o termina. Los algoritmos apropiativos mejoran la respuesta interactiva pero generan más overhead.",
    "id": "base_24",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "En relación con la planificación de procesos, el tiempo de espera de un proceso es:",
    "opts": [
      "El tiempo que hay que esperar desde que empieza el proceso hasta que se obtienen sus resultados.",
      "El tiempo que pasa el proceso en la cola de procesos listos."
    ],
    "ans": 1,
    "ex": "El tiempo de espera (waiting time) es el tiempo total que el proceso pasa en la cola de Listos esperando a que el planificador le asigne la CPU. No incluye el tiempo de E/S ni el de ejecución en CPU.",
    "id": "base_25",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "La planificación SJF (Shortest Job First):",
    "opts": [
      "Es apropiativa, pues debe asegurar que el proceso en ejecución es en todo momento el de ráfaga de CPU más corta.",
      "Es no apropiativa, pues al proceso que está usando la CPU nunca se le puede quitar su uso por muy larga que sea su ráfaga actual."
    ],
    "ans": 1,
    "ex": "SJF clásico es NO apropiativo: una vez que un proceso obtiene la CPU, la conserva hasta que se bloquea o termina. La variante apropiativa es SRTF (Shortest Remaining Time First).",
    "id": "base_26",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "La planificación Round Robin:",
    "opts": [
      "Es no apropiativa, pues hasta que el proceso no consuma su quantum, el SO no puede apropiarse de la CPU.",
      "Es apropiativa, pues el proceso que está en ejecución puede ser desalojado de la CPU sin haberse bloqueado ni haber finalizado."
    ],
    "ans": 1,
    "ex": "Round Robin es el algoritmo apropiativo por excelencia: cuando el proceso agota su quantum el SO lo expulsa aunque no haya terminado ni se haya bloqueado, y el siguiente proceso en la cola de listos recibe la CPU.",
    "id": "base_27",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "La inanición (starvation) por la que un proceso podría no llegar a usar nunca la CPU, podría darse con:",
    "opts": [
      "SRTF y SJF.",
      "FCFS y planificación con prioridades estáticas."
    ],
    "ans": 0,
    "ex": "En SRTF y SJF, los procesos con ráfagas largas pueden esperar indefinidamente si continuamente llegan procesos cortos (starvation). FCFS es justo por orden de llegada (no hay starvation). Las prioridades estáticas SÍ pueden causar starvation, pero FCFS no.",
    "id": "base_28",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "Round Robin con quantum q y N procesos en cola: el tiempo desde que un proceso agota su quantum hasta que vuelve a tomar la CPU es:",
    "opts": [
      "Exactamente igual a q×(N-1) u.t.",
      "Menor o igual a q×(N-1) u.t."
    ],
    "ans": 1,
    "ex": "Hay N-1 procesos delante en la cola, cada uno con quantum máximo q. Si alguno se bloquea antes de consumir su quantum, el proceso esperará MENOS de q×(N-1). En el peor caso es exactamente q×(N-1). Por tanto ≤ q×(N-1).",
    "id": "base_29",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "SJF con estimación. P1 y P2 en cola; estimaciones E1 y E2, tiempos reales T1 y T2:",
    "opts": [
      "Si E1=E2 y T1<T2 pasará a ejecutarse P1.",
      "Si E1>E2 y T1=T2 pasará a ejecutarse P1."
    ],
    "ans": 0,
    "ex": "SJF usa las ESTIMACIONES para decidir. Si E1=E2 las estimaciones son iguales, así que podría ejecutarse P1. En la opción b, E1>E2 → la estimación de P2 es menor → se ejecuta P2, no P1.",
    "id": "base_30",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "En t, P2 comienza el segundo tic de una ráfaga de 5 tics y se desbloquea P1 con ráfaga de 2 tics. En t+1 se ejecutará:",
    "opts": [
      "P2 si el planificador es SRTF oráculo.",
      "P1 si el planificador es Round Robin con q=2 tics."
    ],
    "ans": 1,
    "ex": "SRTF: P2 tiene 4 tics restantes, P1 tiene 2 → SRTF ejecutaría P1 (no P2, opción a incorrecta). RR q=2: P2 está en su segundo tic del quantum, que expira al final de t → en t+1 P1 obtiene la CPU. La opción b es correcta.",
    "id": "base_31",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "P1 y P2 bloqueados se desbloquean en t para ejecutar ráfagas de 2 tics (P1) y 5 tics (P2). En t+1, con CPU libre, Round Robin ejecutará:",
    "opts": [
      "P1 o P2 dependiendo del orden en que se inserten en la cola de listos en t.",
      "P1 siempre, por tener una duración menor de ráfaga de CPU."
    ],
    "ans": 0,
    "ex": "Round Robin no usa la duración de la ráfaga para elegir; eso es SJF/SRTF. RR funciona por cola FIFO: el proceso que llegue primero a la cola de listos será el primero en ejecutarse.",
    "id": "base_32",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "Planificación apropiativa con prioridades dinámicas (+2 por tic en cola). En t: P1 (prioridad 4, ráfaga 5) inicia. P2 (prioridad 1, ráfaga 4) se desbloquea. P2 pasará a usar la CPU:",
    "opts": [
      "En el instante t+2.",
      "En el instante t+3."
    ],
    "ans": 0,
    "ex": "P1 ejecuta con prioridad 4 (en CPU, no cambia). P2 en cola: prioridad en t=1, en t+1=3, en t+2=5. En t+2 la prioridad de P2 (5) supera la de P1 (4) → P2 expulsa a P1 y obtiene la CPU en t+2.",
    "id": "base_33",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "2 colas (cola 0 mayor prioridad, cola 1 menor), ambas RR con q=2. P0 en cola 0 y P1 en cola 1, ambos quieren 4 tics. ¿Qué ocurre en los próximos 4 tics?",
    "opts": [
      "Se ejecutará P0 durante 4 tics y, entonces, se cederá la CPU a P1.",
      "Se ejecutará P0 durante 2 tics y, entonces, se cederá la CPU a P1 durante otros 2 tics."
    ],
    "ans": 0,
    "ex": "La cola 0 tiene mayor prioridad: mientras haya procesos en ella la CPU no va a la cola 1. P0 ejecuta 2 tics (quantum), regresa al final de cola 0, y ejecuta 2 tics más. Solo tras vaciar cola 0 se atiende P1.",
    "id": "base_34",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "Cuando un proceso bloqueado se desbloquea, continúa su ejecución:",
    "opts": [
      "Inmediatamente, para no perjudicar su interactividad con el usuario.",
      "Cuando lo decida el algoritmo de planificación utilizado."
    ],
    "ans": 1,
    "ex": "Al desbloquearse, el proceso pasa al estado Listo y se incorpora a la cola de listos. Es el planificador quien decide cuándo le asigna la CPU. Que se ejecute inmediatamente solo ocurriría si tiene mayor prioridad que el proceso actual.",
    "id": "base_35",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "En la creación de procesos en Unix:",
    "opts": [
      "Tras fork(), padre e hijo tienen diferente PID. exec() construye la nueva imagen del proceso a partir del ejecutable, sin alterar su PID.",
      "Tras fork(), padre e hijo tienen el mismo PID. exec() es la que asigna un nuevo PID al proceso que la ejecuta."
    ],
    "ans": 0,
    "ex": "fork() crea un hijo con un PID nuevo y distinto al del padre. exec() sustituye la imagen del proceso (código, datos, pila) por la del nuevo ejecutable pero NO cambia el PID.",
    "id": "base_36",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "Con respecto a los estados de los procesos:",
    "opts": [
      "Se puede pasar directamente de Bloqueado a Saliente.",
      "No se puede pasar directamente de Ejecución a Listo Suspendido."
    ],
    "ans": 0,
    "ex": "Un proceso bloqueado puede ser eliminado directamente (señal kill) pasando a Saliente sin pasar por Listo. De Ejecución sí se puede pasar a Listo Suspendido en algunas implementaciones.",
    "id": "base_37",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "En cuanto a los hilos:",
    "opts": [
      "No existe protección entre hilos de distintos procesos ya que la protección solo se aplica a nivel de proceso, no de hilo.",
      "Los hilos de un mismo proceso se pueden comunicar entre sí sin intervención del sistema operativo."
    ],
    "ans": 1,
    "ex": "Los hilos de un mismo proceso comparten el espacio de direcciones → pueden compartir variables directamente sin syscalls. Entre hilos de distintos procesos SÍ hay protección (sus procesos tienen espacios de direcciones separados).",
    "id": "base_38",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "En relación con la implementación de los hilos en modo núcleo:",
    "opts": [
      "Los cambios de contexto entre hilos de un mismo proceso son mucho más rápidos que en modo usuario, gracias a la tabla de hilos gestionada por el núcleo.",
      "Permite aprovechar el hecho de que haya múltiples CPUs en el sistema, de forma que varios hilos del mismo proceso podrán ejecutarse a la vez."
    ],
    "ans": 1,
    "ex": "Los hilos de núcleo son entidades independientes para el SO, que puede planificarlos en distintos núcleos de CPU simultáneamente → verdadero paralelismo. Los cambios de contexto entre hilos de núcleo son MÁS LENTOS (no más rápidos) que los de hilos de usuario.",
    "id": "base_39",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "Siempre que se cambia de modo usuario a modo núcleo:",
    "opts": [
      "Es porque se ha producido una interrupción, excepción o llamada al sistema.",
      "Se hace dentro de un cambio de proceso, ya que un cambio de modo solamente no tiene sentido."
    ],
    "ans": 0,
    "ex": "El cambio de modo usuario→núcleo ocurre por uno de estos tres mecanismos: (1) interrupción hardware, (2) excepción (trap), (3) llamada al sistema (syscall). Un cambio de modo por sí solo tiene perfecto sentido: el mismo proceso sigue ejecutando, pero en modo privilegiado.",
    "id": "base_40",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "La planificación Round Robin (RR):",
    "opts": [
      "Puede hacer que un proceso que agota su quantum tenga que esperar hasta (n+1)·q unidades de tiempo para volver a ejecutarse.",
      "Es equitativa entre todos los procesos."
    ],
    "ans": 1,
    "ex": "RR da a cada proceso un quantum igual y atiende a todos en orden cíclico → es equitativo. El tiempo máximo de espera es n·q (no (n+1)·q), siendo n el número de procesos y q el quantum.",
    "id": "base_41",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "SRTF con oráculo. En u.t. 5: en CPU P0 (ráfaga 6, comenzó en u.t. 3). Cola: P1(6 u.t.), P2(3 u.t.), P3(5 u.t.). ¿P0 acabará justo antes de la u.t.?",
    "opts": [
      "u.t. 12.",
      "u.t. 17."
    ],
    "ans": 0,
    "ex": "En u.t. 5, P0 tiene 4 u.t. restantes. SRTF elige el más corto: P2(3) < P0(4). Ejecución: P2 corre u.t. 5-7, luego P0 (4 u.t., u.t. 8-11). P0 acaba justo antes de comenzar u.t. 12.",
    "id": "base_42",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T3",
    "q": "Una invención de la información es:",
    "opts": [
      "Una amenaza a la integridad de la información.",
      "Una amenaza a la confidencialidad de la información."
    ],
    "ans": 0,
    "ex": "'Invención' (fabricación) de información significa crear datos falsos → amenaza la integridad (autenticidad de los datos). La confidencialidad se ve amenazada por la divulgación no autorizada de información existente.",
    "id": "base_43",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T3",
    "q": "El concepto de dominio de protección se asocia a:",
    "opts": [
      "Los procesos y define los objetos a los que puede acceder cada uno de ellos y con qué permisos.",
      "Los objetos y define los procesos que pueden acceder a cada uno de ellos y con qué permisos."
    ],
    "ans": 0,
    "ex": "Un dominio de protección es el conjunto de pares (objeto, derechos de acceso) que tiene un proceso (o usuario). Está asociado al SUJETO (proceso/dominio), no al objeto. La lista que describe qué dominios acceden a un objeto es la ACL.",
    "id": "base_44",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T3",
    "q": "En cuanto a las listas de control de acceso (ACL):",
    "opts": [
      "Cada una está asociada con un dominio de protección y establece los objetos que son accesibles desde dicho dominio.",
      "Cada una está asociada con un objeto, y establece los dominios de protección desde los que se puede acceder a dicho objeto y las operaciones realizables."
    ],
    "ans": 1,
    "ex": "Una ACL está asociada al OBJETO (fichero, recurso) e indica qué sujetos (usuarios, grupos, dominios) pueden acceder a él y con qué permisos. Es la perspectiva 'columna' de la matriz de acceso.",
    "id": "base_45",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T3",
    "q": "En UNIX, cada vez que un proceso quiere leer o escribir un fichero que ya tiene abierto:",
    "opts": [
      "Se chequea la ACL del fichero para ver si el proceso dispone de los permisos necesarios.",
      "Se comprueba la lista de posibilidades del proceso para ver si puede realizar la operación sobre el fichero."
    ],
    "ans": 1,
    "ex": "En UNIX los permisos se comprueban al abrir el fichero (open()). Una vez abierto, el descriptor de fichero actúa como una 'capability': lleva codificado el modo de acceso permitido, evitando rechequear la ACL en cada operación.",
    "id": "base_46",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T3",
    "q": "En UNIX, durante el proceso de login de un usuario:",
    "opts": [
      "Se accede únicamente al fichero /etc/passwd para la validación de la contraseña.",
      "Además de a /etc/shadow, es necesario también acceder al fichero /etc/passwd."
    ],
    "ans": 1,
    "ex": "En UNIX moderno, /etc/passwd contiene información del usuario (nombre, UID, home...) y /etc/shadow contiene el hash de la contraseña. El proceso de login accede a ambos: /etc/passwd para identificar al usuario y /etc/shadow para verificar la contraseña.",
    "id": "base_47",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T3",
    "q": "En UNIX, si se ejecuta el programa passwd con SETUID activado y pertenece a root, el proceso resultante:",
    "opts": [
      "Ejecutará el programa passwd con el procesador en modo usuario.",
      "Ejecutará el programa passwd con el procesador en modo núcleo."
    ],
    "ans": 0,
    "ex": "El bit SETUID solo afecta al UID efectivo del proceso (pasa a ser el del dueño del fichero, root), pero el proceso sigue ejecutando en MODO USUARIO. Solo el código del sistema operativo ejecuta en modo núcleo.",
    "id": "base_48",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T3",
    "q": "Comparando ACL y listas de capacidades:",
    "opts": [
      "La capacidad puede ser copiada, ya que se comporta como un ticket de acceso, mientras que las ACL no ofrecen esa posibilidad.",
      "Las ACL permiten acceso rápido a la lista de usuarios que tienen acceso a un recurso, mientras que las capacidades permiten acceso rápido a la lista de recursos a los que tiene acceso un usuario."
    ],
    "ans": 1,
    "ex": "La ventaja de las ACL es que para un recurso dado es fácil ver quién tiene acceso. La ventaja de las capacidades es que para un proceso dado es fácil ver a qué recursos tiene acceso. La opción b describe correctamente esta asimetría.",
    "id": "base_49",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T3",
    "q": "En Linux, la ejecución de un programa con SETUID/SETGID:",
    "opts": [
      "Puede implicar un cambio de dominio.",
      "Modifica el UID y el GID con que se ejecuta el programa, aunque el usuario y el grupo efectivo sigue siendo el mismo."
    ],
    "ans": 0,
    "ex": "Un programa con SETUID se ejecuta con el UID efectivo del propietario del fichero (normalmente root). Esto implica un cambio de dominio de protección: el proceso puede acceder a recursos que normalmente le estarían vedados.",
    "id": "base_50",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T3",
    "q": "En UNIX se utiliza una base aleatoria (salt) junto a la contraseña. El motivo es:",
    "opts": [
      "Histórico, pero actualmente inútil porque esa base se guarda junto con la clave sin encriptar.",
      "Evitar que para dos usuarios con la misma contraseña se acabe generando el mismo valor encriptado."
    ],
    "ans": 1,
    "ex": "El salt es un valor aleatorio que se concatena con la contraseña antes de aplicar la función hash. Así, dos usuarios con la misma contraseña producen hashes diferentes, dificultando los ataques de diccionario y rainbow tables.",
    "id": "base_51",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T3",
    "q": "Si un directorio de Unix tiene los permisos rwxr-xr-x para usuario1/grupo1, entonces:",
    "opts": [
      "Sólo el usuario1 podrá escribir en los ficheros del directorio.",
      "Sólo el usuario1 podrá eliminar ficheros del directorio."
    ],
    "ans": 1,
    "ex": "El bit 'w' en el directorio controla quién puede crear/eliminar ficheros dentro de él. Solo usuario1 tiene 'w' en el directorio → solo él puede eliminar ficheros. Escribir EN un fichero depende de los permisos del propio fichero.",
    "id": "base_52",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T3",
    "q": "Un fichero especial de caracteres:",
    "opts": [
      "Está asociado con un dispositivo de entrada/salida.",
      "Es un fichero regular de tipo texto."
    ],
    "ans": 0,
    "ex": "Los ficheros especiales de caracteres (character special files) son la abstracción UNIX para dispositivos que transfieren datos carácter a carácter (terminal, puerto serie...). No son ficheros de datos regulares; acceder a ellos equivale a comunicarse con el dispositivo.",
    "id": "base_53",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "La creación de la entrada de directorio para un nuevo fichero regular se realiza:",
    "opts": [
      "A través de la llamada al sistema Create usada para crear el fichero.",
      "Mediante la llamada al sistema Writedir aplicada al directorio en el que quedará el fichero."
    ],
    "ans": 0,
    "ex": "La llamada open()/create() crea el fichero Y actualiza el directorio padre añadiendo la nueva entrada (nombre→inode). No existe una syscall separada 'Writedir'; la actualización del directorio la realiza el SO como parte de la creación del fichero.",
    "id": "base_54",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "¿Cuál de estas implementaciones de ficheros daría lugar a fragmentación externa?",
    "opts": [
      "Asignación mediante lista ligada.",
      "Asignación adyacente (contigua)."
    ],
    "ans": 1,
    "ex": "La asignación contigua reserva bloques consecutivos para cada fichero. Con el tiempo, al borrar ficheros quedan huecos dispersos que no pueden alojar un nuevo fichero grande → fragmentación externa. La lista ligada y los nodos-i no tienen fragmentación externa.",
    "id": "base_55",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "Nodos-i con bloques de 1 KiB y direcciones de bloque de 4 bytes. A través de cada bloque doblemente indirecto se puede llegar a:",
    "opts": [
      "65.536 bloques de datos.",
      "1.024 bloques de datos."
    ],
    "ans": 0,
    "ex": "Cada bloque de 1 KiB con punteros de 4 bytes contiene 1024/4 = 256 punteros. Un bloque doblemente indirecto apunta a 256 bloques simplemente indirectos, cada uno con 256 punteros a datos: 256×256 = 65.536 bloques de datos.",
    "id": "base_56",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "Lista ligada sin índice: para obtener el byte Z del bloque X (X≠0) de un fichero cuyo primer bloque está en dirección D hay que leer:",
    "opts": [
      "X+1 bloques del disco.",
      "D+X bloques del disco."
    ],
    "ans": 0,
    "ex": "Para llegar al bloque X de una lista enlazada hay que seguir la cadena desde el bloque 0: leer bloque 0 (en D), bloque 1, ..., bloque X. Total: X+1 lecturas. La opción b confunde direcciones de disco con número de bloques a leer.",
    "id": "base_57",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "En un sistema de ficheros Unix, el número máximo de ficheros que se pueden crear:",
    "opts": [
      "Depende exclusivamente del número de nodos-i de que dispone.",
      "Depende exclusivamente del número de bloques lógicos que haya en la zona de datos."
    ],
    "ans": 0,
    "ex": "Cada fichero en UNIX requiere exactamente un nodo-i. El número de nodos-i es fijo (definido al formatear). Aunque queden bloques libres, si no hay nodos-i disponibles no se pueden crear más ficheros.",
    "id": "base_58",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "El objetivo de una caché de disco como la vista en clase es:",
    "opts": [
      "Mejorar el rendimiento de las operaciones de lectura de disco. Las escrituras siempre se hacen directamente en el disco para evitar inconsistencias.",
      "Mejorar el rendimiento de las operaciones de lectura/escritura de los discos."
    ],
    "ans": 1,
    "ex": "La caché de disco mejora TANTO lecturas (bloque ya en caché → no hay acceso a disco) como escrituras (escritura diferida/write-back → se acumula en memoria y se escribe en disco más tarde). Solo en modo write-through las escrituras van directas al disco.",
    "id": "base_59",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "Con nodo-i del directorio raíz NO en memoria, cada directorio en 1 bloque y cada nodo-i en un bloque diferente, ¿cuántos bloques hay que leer para cargar el nodo-i de /home/invitado/fichero.txt?",
    "opts": [
      "7 bloques.",
      "6 bloques."
    ],
    "ans": 0,
    "ex": "1:nodo-i de '/', 2:bloque datos de '/' (→'home'), 3:nodo-i de 'home', 4:bloque datos de 'home' (→'invitado'), 5:nodo-i de 'invitado', 6:bloque datos de 'invitado' (→'fichero.txt'), 7:nodo-i de 'fichero.txt'. Total = 7 bloques.",
    "id": "base_60",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "Disco con sectores de 512 bytes y FS con bloques de 4096 bytes. Un fichero de 510 bytes ocupa:",
    "opts": [
      "Exactamente un bloque lógico.",
      "Exactamente un sector."
    ],
    "ans": 0,
    "ex": "510 bytes < 4096 bytes → el fichero ocupa 1 bloque lógico (con fragmentación interna de 4096-510=3586 bytes). El bloque lógico (4096 bytes) es la unidad de asignación del FS, no el sector.",
    "id": "base_61",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "Unix: creamos fichero F y luego 5 enlaces: 2 simbólicos y 3 físicos. ¿Qué valor tiene el contador de enlaces del nodo-i de F?",
    "opts": [
      "4",
      "6"
    ],
    "ans": 0,
    "ex": "El link count del nodo-i solo cuenta los enlaces FÍSICOS (hard links). F tiene 1 (el propio fichero) + 3 hard links = 4. Los 2 enlaces simbólicos tienen su propio nodo-i y NO incrementan el link count del nodo-i de F.",
    "id": "base_62",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "Las entradas de un directorio se leen con readdir y no con read porque:",
    "opts": [
      "Los directorios se implementan de forma diferente al resto de ficheros y no pueden ser accedidos con read.",
      "readdir permite aislar a los procesos de los detalles de implementación de los directorios; así un proceso puede acceder al contenido de un directorio aunque su implementación cambie."
    ],
    "ans": 1,
    "ex": "La razón principal es la portabilidad: la estructura interna de un directorio varía (FAT, ext4, NTFS...). readdir ofrece una interfaz POSIX estándar independiente del FS. Los directorios SÍ pueden leerse con read() a bajo nivel (es lo que hace readdir internamente).",
    "id": "base_63",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "SF1 (MS-DOS/FAT) y SF2 (UNIX), mismo tamaño de bloque. Directorio D en 1 bloque; índice de SF1 y nodo-i de SF2 ya en memoria. Accesos a disco para listar ficheros de D con su tamaño:",
    "opts": [
      "Será igual en SF1 y SF2.",
      "Será mayor en SF2 que en SF1."
    ],
    "ans": 1,
    "ex": "FAT: el tamaño está en la entrada del directorio → 1 acceso (leer bloque de D). UNIX: el tamaño está en el nodo-i de cada fichero → 1 acceso para el bloque de D + N accesos para los nodos-i de cada fichero. SF2 requiere más accesos.",
    "id": "base_64",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "Nodo-i de '/' y su bloque de datos ya en memoria. Cada directorio en 1 bloque; cada nodo-i en un bloque diferente. Para leer el byte X de /home/alumno/ExamenISO/ejercicio1.sh hay que leer:",
    "opts": [
      "9 bloques de disco como mínimo.",
      "11 bloques de disco como máximo."
    ],
    "ans": 1,
    "ex": "Traversal: nodo-i home + bloque home + nodo-i alumno + bloque alumno + nodo-i ExamenISO + bloque ExamenISO + nodo-i ejercicio1.sh = 7 bloques. Mínimo: 7+1(dato directo)=8. Máximo: 7+1(BSI)+1(BDI)+1(BTI)+1(dato)=11. La opción b (11 máximo) es correcta.",
    "id": "base_65",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "Unix: creamos F1 y luego un enlace simbólico ESF1 a F1. El contador de enlaces de cada uno:",
    "opts": [
      "Tanto ESF1 como F1 tendrán contador de enlaces = 1.",
      "Tanto ESF1 como F1 tendrán contador de enlaces = 2."
    ],
    "ans": 0,
    "ex": "F1 tiene link count=1 (solo F1 apunta a su nodo-i). ESF1 es un enlace simbólico con su propio nodo-i y link count=1. Los enlaces simbólicos NO incrementan el link count del objetivo.",
    "id": "base_66",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "Número de bloques para registro de bloques libres (B bytes/bloque, D bytes/dirección, N bloques de datos):",
    "opts": [
      "⌈N/(8×B)⌉ si se usa el mapa de bits.",
      "⌈N×D/(8×B)⌉ si se usa la lista ligada de bloques."
    ],
    "ans": 0,
    "ex": "Mapa de bits: N bits → N/8 bytes → ⌈N/(8B)⌉ bloques. La fórmula de a es correcta. Para lista ligada: N×D bytes → ⌈N×D/B⌉ bloques (sin el 8 en denominador). La fórmula de b es incorrecta.",
    "id": "base_67",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "En cuanto a la caché de disco, es cierto que:",
    "opts": [
      "Es una colección de bloques que pertenecen lógicamente al disco, pero que se mantienen temporalmente en la memoria principal.",
      "Es una colección de bloques que pertenecen lógicamente a la memoria principal, pero que se mantienen temporalmente en disco."
    ],
    "ans": 0,
    "ex": "La caché de disco es una región de la RAM que almacena temporalmente bloques del disco. Lógicamente esos bloques son del disco (contienen datos persistentes), pero se mantienen en memoria para acceso rápido.",
    "id": "base_68",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "Aumentar el tamaño de bloque lógico de B a 4×B bytes provoca que:",
    "opts": [
      "El tamaño en bytes de los nodos-i aumente.",
      "El número de bits del mapa de bits para bloques de datos disminuya."
    ],
    "ans": 1,
    "ex": "Con bloques más grandes, hay menos bloques en la zona de datos → menos bits necesarios en el mapa de bits. El tamaño del nodo-i no cambia (es una estructura fija del FS, no depende del tamaño de bloque).",
    "id": "base_69",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "UNIX FS con I nodos-i de S bytes, bloques de B bytes, N bloques indirectos en uso. El tamaño total de la tabla de nodos-i es:",
    "opts": [
      "⌈I×S/B⌉ bloques lógicos.",
      "⌈I×S/B⌉ + N bloques lógicos."
    ],
    "ans": 0,
    "ex": "La tabla de nodos-i tiene I entradas de S bytes → I×S bytes → ⌈I×S/B⌉ bloques. Los bloques indirectos (BSI, BDI, BTI) pertenecen a la zona de datos, no a la zona de nodos-i. El tamaño de la tabla no varía con el número de bloques indirectos.",
    "id": "base_70",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "Uno de los problemas de la multiprogramación con particiones de tamaño fijo es que:",
    "opts": [
      "Para que un mismo proceso pueda usar varias particiones, estas deben estar consecutivas en memoria.",
      "Si hay gran diferencia entre los tamaños máximo y mínimo de los procesos, se podría producir mucha fragmentación interna."
    ],
    "ans": 1,
    "ex": "Con particiones fijas, un proceso pequeño cargado en una partición grande desaprovecha gran parte de esa partición (fragmentación interna). Si los procesos tienen tamaños muy variados, el desperdicio es enorme.",
    "id": "base_71",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "De entre las políticas para asignación de huecos en particiones variables:",
    "opts": [
      "La 'Siguiente en ajustarse' suele ser más rápida que la 'Mejor en ajustarse' a la hora de buscar una partición libre.",
      "La 'Mejor en ajustarse' suele producir mejores resultados que la 'Peor en ajustarse' en cuanto al aprovechamiento de la memoria."
    ],
    "ans": 0,
    "ex": "'Siguiente en ajustarse' retoma la búsqueda donde la dejó (puntero circular), evitando recorrer siempre desde el principio → más rápida que 'Mejor en ajustarse' que busca el hueco más ajustado en toda la lista.",
    "id": "base_72",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "La técnica de Compactación:",
    "opts": [
      "Se requiere tanto en particiones de tamaño fijo como en las de tamaño variable.",
      "Únicamente tiene sentido en esquemas de administración con particiones de tamaño variable."
    ],
    "ans": 1,
    "ex": "La compactación consiste en mover procesos en memoria para unir los huecos libres dispersos (fragmentación externa). Las particiones fijas tienen fragmentación INTERNA, no externa, por lo que la compactación no las mejora.",
    "id": "base_73",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "En cuanto a los esquemas de administración de la memoria libre para particiones variables:",
    "opts": [
      "Con la lista ligada, la operación de fusión de huecos cuando un proceso acaba sería más lenta que con el mapa de bits.",
      "Con el mapa de bits es más rápido encontrar un hueco para un proceso que necesite un gran número de unidades de asignación."
    ],
    "ans": 0,
    "ex": "Con lista ligada, fusionar huecos adyacentes requiere encontrar y actualizar los nodos vecinos (más complejo). Con mapa de bits, la fusión es implícita (solo se limpian bits). Para encontrar huecos grandes, la lista ligada es más eficiente que escanear el mapa de bits bit a bit.",
    "id": "base_74",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "Para garantizar la protección de memoria entre procesos en un esquema con particiones, el sistema operativo debe intervenir:",
    "opts": [
      "En cada acceso a memoria, para chequear que la dirección generada por cada proceso está dentro del rango permitido.",
      "Únicamente cuando el hardware detecte un acceso a memoria fuera del rango permitido, para abortar la ejecución del proceso."
    ],
    "ans": 1,
    "ex": "La comprobación de límites la realiza el HARDWARE (registros base/límite de la MMU) en cada acceso automáticamente. El SO solo interviene cuando el hardware detecta una violación (genera excepción/trap) para abortar el proceso infractor.",
    "id": "base_75",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "El esquema de memoria virtual con paginación:",
    "opts": [
      "Requiere que cada proceso tenga necesariamente su propia tabla de páginas en memoria para garantizar la protección entre procesos.",
      "Permite ejecutar procesos con requerimientos de memoria incluso mayores que el tamaño de la memoria física instalada."
    ],
    "ans": 1,
    "ex": "La memoria virtual con paginación permite que las páginas no usadas residan en disco, cargándolas bajo demanda. Así, el espacio de direcciones virtual puede ser mayor que la RAM física. Esta es la ventaja definitoria de la memoria virtual.",
    "id": "base_76",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "Al traducir una dirección virtual a física, ¿cuál de estas situaciones podría darse?",
    "opts": [
      "Fallo en el TLB y Fallo de Protección.",
      "Acierto en el TLB y Fallo de Página."
    ],
    "ans": 0,
    "ex": "Un fallo de TLB (miss) puede ocurrir junto con un fallo de protección (al consultar la tabla de páginas se descubre que el acceso viola los permisos). Acierto en TLB + fallo de página es imposible: si el TLB tiene la entrada, la página está en memoria.",
    "id": "base_77",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "Con respecto al TLB, es cierto que:",
    "opts": [
      "Es una estructura hardware (caché) que el SO utiliza para almacenar las últimas traducciones realizadas.",
      "Lo usa la MMU para realizar traducciones de direcciones virtuales a físicas de forma rápida, sin acceder a la tabla de páginas."
    ],
    "ans": 1,
    "ex": "El TLB es una caché hardware gestionada por la MMU (no directamente por el SO). La MMU lo consulta primero; si hay acierto, la traducción es inmediata sin acceder a la tabla de páginas en memoria.",
    "id": "base_78",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "Tabla de páginas lineal vs. invertida:",
    "opts": [
      "El tamaño de cada entrada en la tabla invertida suele ser mayor que el de cada entrada en la tabla lineal.",
      "El número total de entradas en la tabla invertida suele ser mayor que el de la tabla lineal."
    ],
    "ans": 0,
    "ex": "Tabla lineal: una entrada por página virtual (enorme). Tabla invertida: una entrada por marco físico (proporcional a RAM, mucho menor). Cada entrada invertida almacena PID + nº página virtual + info → más grande que una entrada lineal (solo nº de marco).",
    "id": "base_79",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "TLB + tabla de páginas multinivel con 2 niveles. ¿Cuántos accesos a memoria se necesitan como mínimo para traducir una dirección de una página en memoria?",
    "opts": [
      "0.",
      "2."
    ],
    "ans": 0,
    "ex": "Si el TLB tiene la entrada (TLB hit), la traducción se realiza sin ningún acceso a memoria principal (el TLB es hardware, no RAM). El mínimo de accesos a memoria es 0. El máximo (TLB miss + 2 niveles) sería 2 accesos a tabla + 1 al dato.",
    "id": "base_80",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "Un proceso ha realizado N accesos a memoria, E escrituras, F fallos de página, M reemplazos con bit Modificado=1. El número de accesos a disco es:",
    "opts": [
      "N accesos de lectura y E accesos de escritura.",
      "F accesos de lectura y M accesos de escritura."
    ],
    "ans": 1,
    "ex": "Cada fallo de página requiere traer la página del disco → F lecturas de disco. Cada reemplazo de página modificada requiere escribirla en disco → M escrituras de disco. Los accesos en memoria y escrituras en RAM no implican accesos a disco directamente.",
    "id": "base_81",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "El mapa de memoria de un proceso:",
    "opts": [
      "Indica los rangos en el espacio de direcciones virtuales donde se encuentran las distintas partes del proceso (código, datos, pila...).",
      "Indica los rangos en el espacio de direcciones físicas donde se encuentran las distintas partes del proceso."
    ],
    "ans": 0,
    "ex": "El mapa de memoria (memory map) describe la organización del espacio de direcciones VIRTUALES del proceso: qué regiones existen, sus tamaños y permisos. No indica dónde están en RAM (eso cambia con la paginación).",
    "id": "base_82",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "En memoria virtual con paginación, para cada región de memoria:",
    "opts": [
      "Se tiene como soporte asociado siempre un fichero, que se usará para obtener los contenidos de la región.",
      "A través de su información de protección se determinan las operaciones realizables sobre sus páginas (leer, escribir, ejecutar)."
    ],
    "ans": 1,
    "ex": "No toda región tiene fichero de soporte (la memoria anónima, como heap o pila, no tiene fichero). Lo que SÍ tiene toda región es información de protección (permisos rwx) que determina qué operaciones son válidas sobre sus páginas.",
    "id": "base_83",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "La técnica de 'Copia en Escritura' (Copy-on-Write) consiste en que:",
    "opts": [
      "Cuando el SO detecta una escritura en una región compartida, crea una copia separada de la región afectada para el proceso que realizó la escritura.",
      "Cuando el SO detecta una escritura en una región compartida, crea una copia separada de la página afectada de dicha región para el proceso que realizó la escritura."
    ],
    "ans": 1,
    "ex": "CoW opera a nivel de PÁGINA, no de región entera. Solo se copia la página específica que se intenta modificar. Esto minimiza el coste: si dos procesos comparten 100 páginas y uno modifica solo 1, solo se copia esa 1 página.",
    "id": "base_84",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "Dado un SO que utiliza política de asignación fija, para un proceso P:",
    "opts": [
      "El número de marcos de página de P será siempre el mismo durante toda su ejecución.",
      "El número de marcos de página de P podría aumentar durante su ejecución solamente bajo el control del SO."
    ],
    "ans": 0,
    "ex": "Con asignación FIJA, el número de marcos asignados a cada proceso se determina al cargar el proceso y NO cambia durante su ejecución. La asignación dinámica sí permite variar el número de marcos.",
    "id": "base_85",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "De entre los algoritmos de reemplazo de páginas, es cierto que:",
    "opts": [
      "El algoritmo LRU con contador de 64 bits requiere menos bits en cada entrada de la tabla de páginas que el algoritmo NRU.",
      "El algoritmo de envejecimiento con los 10 últimos valores del bit R requiere menos bits en cada entrada que LRU con contador de 64 bits."
    ],
    "ans": 1,
    "ex": "NRU usa 2 bits (R y M). LRU con contador de 64 bits necesita 64 bits. Envejecimiento con 10 bits: 10 bits. La opción a dice LRU(64 bits) < NRU(2 bits) → FALSO. La opción b dice Envejecimiento(10 bits) < LRU(64 bits) → VERDADERO.",
    "id": "base_86",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "El demonio de paginación del sistema operativo:",
    "opts": [
      "Interviene durante cada fallo de página y decide si trae solamente la página afectada o también páginas contiguas.",
      "No interviene durante los fallos de página, sino que realiza acciones que hagan que estos se puedan resolver más rápidamente cuando se produzcan."
    ],
    "ans": 1,
    "ex": "El demonio de paginación trabaja en segundo plano de forma PROACTIVA: cuando los marcos libres caen por debajo de un umbral, selecciona y libera páginas ANTES de que se produzcan fallos. No interviene directamente en la resolución de los fallos.",
    "id": "base_87",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "El fenómeno de la hiperpaginación (thrashing):",
    "opts": [
      "Podría surgir solamente con una política de asignación dinámica.",
      "Podría surgir tanto con una política de asignación fija como con una de asignación dinámica."
    ],
    "ans": 1,
    "ex": "El thrashing puede ocurrir con asignación FIJA si se asignan demasiado pocos marcos a un proceso. También puede ocurrir con asignación dinámica y reemplazo global si el SO no controla bien el conjunto de trabajo.",
    "id": "base_88",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "El número total de tablas de traducción para un proceso con S segmentos sería:",
    "opts": [
      "1 si se implementa segmentación pura.",
      "S si se implementa segmentación paginada."
    ],
    "ans": 0,
    "ex": "Segmentación pura: 1 tabla de segmentos (con S entradas). Segmentación paginada: 1 tabla de segmentos + S tablas de páginas = S+1 tablas en total, no S. La afirmación correcta es la de segmentación pura: 1 tabla.",
    "id": "base_89",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "En cuanto a la segmentación paginada es cierto que:",
    "opts": [
      "El tamaño de un segmento puede ser mayor que el de la memoria física.",
      "Las transferencias con disco se realizan de segmentos completos."
    ],
    "ans": 0,
    "ex": "La segmentación paginada combina segmentos con paginación: las transferencias son de PÁGINAS (no segmentos completos), y el tamaño del segmento puede superar la RAM gracias a la memoria virtual.",
    "id": "base_90",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "Comparando segmentación paginada con segmentación pura:",
    "opts": [
      "En la segmentación pura podemos tener fragmentación externa, y en la segmentación paginada, no.",
      "En ambas, para cada segmento tenemos una base con la dirección de inicio en memoria y un límite con la longitud."
    ],
    "ans": 0,
    "ex": "La segmentación pura asigna segmentos contiguos en memoria → fragmentación externa (huecos entre segmentos). La segmentación paginada divide cada segmento en páginas del mismo tamaño → no hay fragmentación externa.",
    "id": "base_91",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "Tabla de páginas multinivel con N niveles. TLB miss pero acierto en la tabla de páginas. Número de accesos a memoria principal para completar la traducción:",
    "opts": [
      "N, en todos los casos.",
      "Desde 1 hasta N, dependiendo del nivel de la tabla en el que se encuentre la entrada."
    ],
    "ans": 0,
    "ex": "Con TLB miss y la página en memoria, se recorre la tabla de páginas de nivel 1 hasta nivel N: 1 acceso a memoria por nivel. Siempre se recorren TODOS los niveles: N accesos en todos los casos.",
    "id": "base_92",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "El bit de 'Caching Desactivado' en cada entrada de la tabla de páginas sirve para:",
    "opts": [
      "Implementar la política de 'Escritura Anticipada', escribiendo en disco las páginas modificadas con dicho bit a 1.",
      "Evitar que el contenido de ciertas páginas se almacene en la memoria caché del procesador."
    ],
    "ans": 1,
    "ex": "El bit 'Caching Disabled' evita que la CPU cachee el contenido de esas páginas. Se usa para páginas mapeadas sobre registros de E/S o memoria de dispositivos (donde leer dos veces la misma dirección puede devolver valores distintos).",
    "id": "base_93",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "El 'algoritmo de frecuencia de fallos de página':",
    "opts": [
      "Es un algoritmo utilizado para el reparto de marcos entre procesos.",
      "Es un algoritmo de reemplazo de páginas."
    ],
    "ans": 0,
    "ex": "El algoritmo de frecuencia de fallos de página (Page Fault Frequency) monitoriza la tasa de fallos de cada proceso y ajusta dinámicamente el número de marcos asignados → es un algoritmo de ASIGNACIÓN (reparto de marcos), no de reemplazo.",
    "id": "base_94",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T5",
    "q": "Si tenemos particionado estático de memoria:",
    "opts": [
      "Si hay dos particiones menores libres que, unidas, permitan que el proceso quepa, se podrán juntar y ejecutarlo en ellas.",
      "No se podrá ejecutar un proceso si no hay ninguna partición disponible con un tamaño mayor o igual que el del proceso."
    ],
    "ans": 1,
    "ex": "En particionado estático las particiones son FIJAS e independientes; no se pueden fusionar. Si el proceso no cabe en ninguna partición individual, no se puede ejecutar aunque la suma de particiones libres sea suficiente.",
    "id": "base_95",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T6",
    "q": "La diferencia fundamental entre un dispositivo de bloques y uno de caracteres es que:",
    "opts": [
      "El primero permite acceso aleatorio a los datos, mientras que el segundo impone siempre un acceso secuencial.",
      "En el segundo la información está siempre codificada en algún código de caracteres (ej. ASCII), mientras que en el primero no."
    ],
    "ans": 0,
    "ex": "Dispositivo de bloques (disco): permite leer/escribir cualquier bloque en cualquier orden → acceso aleatorio. Dispositivo de caracteres (terminal, puerto serie): el flujo de datos es secuencial, sin acceso aleatorio. El nombre 'caracteres' no implica codificación ASCII.",
    "id": "base_96",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T6",
    "q": "En cuanto a los manejadores de dispositivo en UNIX, es cierto que:",
    "opts": [
      "Al ser proporcionados por los fabricantes, no forman parte del núcleo del SO y su ejecución se realiza en modo usuario.",
      "Una vez instalados, pasan a formar parte del núcleo del SO y su ejecución se realiza con el procesador en modo núcleo."
    ],
    "ans": 1,
    "ex": "Los drivers en UNIX son módulos del kernel: una vez instalados (cargados en el núcleo) ejecutan en modo núcleo, con acceso completo al hardware. Ejecutarlos en modo usuario sería demasiado lento e inseguro.",
    "id": "base_97",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T6",
    "q": "Una de las funciones realizadas por el software de E/S independiente del dispositivo es:",
    "opts": [
      "Asociar el nombre simbólico de un dispositivo de E/S con el manejador correspondiente.",
      "Definir una interfaz uniforme a la que todos los manejadores deben adherirse."
    ],
    "ans": 0,
    "ex": "El software independiente del dispositivo asocia nombres simbólicos (p.ej., /dev/sda) con los manejadores concretos mediante tablas de dispositivos. También ofrece buffering, control de errores y gestión de permisos.",
    "id": "base_98",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T6",
    "q": "En Unix, el control de acceso a un dispositivo de E/S se logra a través de:",
    "opts": [
      "Cierta información almacenada en el nodo-i del fichero especial de dispositivo correspondiente.",
      "Una tabla de dispositivos mantenida por el kernel con los permisos para cada dispositivo."
    ],
    "ans": 0,
    "ex": "En UNIX los dispositivos se representan como ficheros especiales en /dev. El control de acceso se implementa mediante los permisos del nodo-i de ese fichero especial (usuario, grupo, rwx), exactamente igual que con ficheros regulares.",
    "id": "base_99",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T6",
    "q": "Una vez que un dispositivo finaliza una operación de E/S, intervienen, en este orden:",
    "opts": [
      "Manejador del dispositivo → Manejador de interrupciones → Software independiente del dispositivo → Software en espacio de usuario.",
      "Manejador de interrupciones → Manejador del dispositivo → Software independiente del dispositivo → Software en espacio de usuario."
    ],
    "ans": 1,
    "ex": "Cuando el dispositivo termina: (1) genera una interrupción → (2) el manejador de interrupciones la detecta y llama → (3) al manejador del dispositivo (driver), que notifica → (4) al software independiente del dispositivo → (5) al proceso de usuario que esperaba.",
    "id": "base_100",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T6",
    "q": "En relación a los planificadores del brazo lector de un disco, es cierto que:",
    "opts": [
      "SSF (Shortest Seek First) puede dar lugar a que una petición de disco no se atienda nunca.",
      "FIFO suele producir menos movimientos de las cabezas del disco que SCAN."
    ],
    "ans": 0,
    "ex": "SSF/SSTF puede causar inanición: si continuamente llegan peticiones cercanas a la posición actual del brazo, las peticiones de cilindros lejanos nunca se atienden. FIFO no produce starvation pero genera más movimientos que SCAN.",
    "id": "base_101",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T6",
    "q": "Dado un disco girando a R RPM con dos zonas Z1 (S1 sectores/pista) y Z2 (S2 sectores/pista, S1>S2), el tiempo medio de latencia:",
    "opts": [
      "Es siempre mayor para un acceso a un sector de Z2 que de Z1.",
      "Es siempre igual para un acceso a un sector de Z2 que de Z1."
    ],
    "ans": 1,
    "ex": "El tiempo medio de latencia es el tiempo de media vuelta del disco: 30/R segundos. Depende únicamente de la velocidad de rotación (RPM), que es la misma para todas las zonas. El número de sectores por pista no afecta la latencia rotacional.",
    "id": "base_102",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T6",
    "q": "El tiempo de búsqueda (seek time) para un sector del cilindro B, con cabezas en cilindro A, es:",
    "opts": [
      "| A - B | × c ms.",
      "| A - B | × c + l + t ms."
    ],
    "ans": 0,
    "ex": "El tiempo de búsqueda es solo el tiempo de mover las cabezas: |A-B| cilindros × c ms/cilindro. La latencia rotacional (l) y el tiempo de transferencia (t) son fases POSTERIORES e independientes del seek.",
    "id": "base_103",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T6",
    "q": "A la hora de llevar el control de la hora del día, el manejador del reloj del sistema operativo:",
    "opts": [
      "Consulta en cada tic el valor registrado por el reloj de tiempo real de la placa base.",
      "Incrementa siempre un registro de marcas, independientemente de la implementación usada."
    ],
    "ans": 1,
    "ex": "El manejador del reloj mantiene un contador software de 'ticks' que incrementa en cada interrupción. A partir de ese contador calcula la hora. Puede consultar el RTC al arrancar para inicializarse, pero en cada tick solo incrementa el contador software.",
    "id": "base_104",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T6",
    "q": "Dado un reloj programable con oscilador a F MHz, aumentar el valor del registro de carga (C):",
    "opts": [
      "Aumenta el porcentaje de tiempo de CPU dedicado a ejecutar el manejador del reloj.",
      "Disminuye la resolución a la hora de medir el tiempo."
    ],
    "ans": 1,
    "ex": "C mayor → el contador tarda más en llegar a 0 → menos interrupciones por segundo → los ticks son menos frecuentes → menor resolución temporal. Además, menos interrupciones → MENOS tiempo de CPU para el manejador (opción a es incorrecta).",
    "id": "base_105",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T6",
    "q": "El mecanismo de alarmas estudiado en clase:",
    "opts": [
      "Puede ser utilizado por un proceso de usuario para que el SO le envíe una señal pasado un cierto tiempo.",
      "Es empleado por el SO para detectar cuándo un proceso ha consumido su quantum."
    ],
    "ans": 0,
    "ex": "Las alarmas (alarm() en POSIX) permiten a un proceso pedir al SO que le envíe la señal SIGALRM después de un tiempo especificado. El quantum se controla mediante el manejador del reloj y el planificador, sin usar el mecanismo de alarmas de usuario.",
    "id": "base_106",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T6",
    "q": "Un sistema de spooling es útil en un sistema multiprogramado para la gestión de:",
    "opts": [
      "Un disco duro.",
      "Una impresora."
    ],
    "ans": 1,
    "ex": "El spooling es especialmente útil para dispositivos de uso exclusivo y lento como las impresoras. Los trabajos de impresión se depositan en una cola en disco (spool) y el SO los va enviando a la impresora de forma ordenada.",
    "id": "base_107",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T6",
    "q": "El manejador del reloj se encarga directamente, entre otras tareas, de:",
    "opts": [
      "Mantener la hora, registrar el uso de la CPU y activar el motor de la unidad de DVD.",
      "Evitar la monopolización de la CPU, registrar el uso de la CPU y controlar las alarmas."
    ],
    "ans": 1,
    "ex": "El manejador del reloj actualiza la hora del sistema, acumula estadísticas de uso de CPU por proceso, decrementa el contador de quantum (evita monopolización) y gestiona alarmas de procesos de usuario. Activar un motor de DVD es tarea del driver del dispositivo.",
    "id": "base_108",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T6",
    "q": "Un ordenador a M MIPS, reloj a F MHz, registro de carga C. Número máximo de instrucciones del manejador del reloj para tratar todas las marcas de reloj:",
    "opts": [
      "M × C / F",
      "F × M / C"
    ],
    "ans": 0,
    "ex": "Frecuencia de ticks = F/C MHz. Tiempo entre ticks = C/(F×10⁶) s. A M MIPS se ejecutan M×10⁶ × C/(F×10⁶) = M×C/F instrucciones por tick. Ese es el máximo para el manejador.",
    "id": "base_109",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T6",
    "q": "Dado un disco girando a R RPM, con S sectores por pista, el tiempo medio de latencia se calcula como:",
    "opts": [
      "60 / (S × R) segundos.",
      "30 / R segundos."
    ],
    "ans": 1,
    "ex": "El tiempo de una vuelta completa es 60/R segundos. El tiempo medio de latencia (esperar como máximo media vuelta) es (60/R)/2 = 30/R segundos. El número de sectores S no afecta la latencia rotacional.",
    "id": "base_110",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T6",
    "q": "El manejador de interrupciones:",
    "opts": [
      "Cuando se produce una interrupción, la atiende y, después, avisa al manejador de dispositivo correspondiente.",
      "Cuando se quiere realizar una operación de E/S, envía las órdenes oportunas al dispositivo."
    ],
    "ans": 0,
    "ex": "El manejador de interrupciones (interrupt handler) es el código de bajo nivel que recibe la interrupción, guarda el contexto, e invoca al driver correspondiente para que la procese. La opción b describe el inicio de una operación de E/S, no el manejo de la interrupción de finalización.",
    "id": "base_111",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T6",
    "q": "El software de E/S convierte las transferencias asíncronas en síncronas para que:",
    "opts": [
      "Las operaciones de E/S del usuario parezcan síncronas para el dispositivo de E/S.",
      "Las operaciones de E/S controladas por interrupciones actúen de manera bloqueante para los programas de usuario."
    ],
    "ans": 1,
    "ex": "El hardware de E/S usa interrupciones (asíncrono). El SO convierte esto en una operación bloqueante para el proceso: el proceso llama a read(), se bloquea, y cuando llega la interrupción el SO lo desbloquea. El proceso ve una operación síncrona aunque el hardware sea asíncrono.",
    "id": "base_112",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T6",
    "q": "En relación a los discos, el tiempo de búsqueda (seek time):",
    "opts": [
      "Es el tiempo necesario para que el disco gire en busca de los sectores a leer/escribir.",
      "Es el tiempo necesario para mover el soporte de los brazos hasta colocar las cabezas en el cilindro adecuado."
    ],
    "ans": 1,
    "ex": "Seek time = tiempo de movimiento del brazo hasta el cilindro correcto. El giro del disco para llegar al sector es la latencia rotacional. Confundirlos es un error común.",
    "id": "base_113",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T1",
    "q": "A la hora de implementar las llamadas al sistema:\na) Suele existir un mecanismo hardware distinto para cada categoría de llamada al sistema.\nb) Todas suelen usar el mismo mecanismo hardware a través del cual el procesador cambia de modo usuario a modo núcleo de forma controlada.",
    "opts": [
      "Suele existir un mecanismo hardware distinto para cada categoría de llamada al sistema.",
      "Todas suelen usar el mismo mecanismo hardware a través del cual el procesador cambia de modo usuario a modo núcleo de forma controlada."
    ],
    "ans": 1,
    "ex": "Independientemente del tipo de llamada al sistema, todas utilizan el mismo mecanismo hardware (interrupción software o instrucción SYSCALL) que provoca el cambio controlado de modo usuario a modo núcleo.",
    "id": "base_114",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T1",
    "q": "Las llamadas al sistema:\na) son la única forma de pedirle un servicio al núcleo del sistema operativo.\nb) es imposible hacerlas directamente, de ahí que se hagan a través de una biblioteca del sistema.",
    "opts": [
      "son la única forma de pedirle un servicio al núcleo del sistema operativo.",
      "es imposible hacerlas directamente, de ahí que se hagan a través de una biblioteca del sistema."
    ],
    "ans": 0,
    "ex": "Las llamadas al sistema son el único mecanismo de que disponen los procesos para solicitar servicios al núcleo del SO. Aunque habitualmente se usan a través de una biblioteca (como libc), sí se pueden hacer directamente.",
    "id": "base_115",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T1",
    "q": "El intérprete de órdenes es un programa del sistema que funciona:\na) en modo usuario, haciendo uso de las llamadas al sistema que proporciona el sistema operativo.\nb) dentro del núcleo del sistema operativo ya que necesita hacer operaciones que cualquier proceso de usuario no puede.",
    "opts": [
      "en modo usuario, haciendo uso de las llamadas al sistema que proporciona el sistema operativo.",
      "dentro del núcleo del sistema operativo ya que necesita hacer operaciones que cualquier proceso de usuario no puede."
    ],
    "ans": 0,
    "ex": "El shell (intérprete de órdenes) es un proceso normal que corre en modo usuario. Para cualquier operación privilegiada invoca las llamadas al sistema del SO, igual que cualquier otro proceso.",
    "id": "base_116",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T1",
    "q": "De los mecanismos de protección hardware que ayudan al sistema operativo a proteger el sistema:\na) No se puede prescindir de ninguno de los tres.\nb) Las interrupciones periódicas no son necesarias realmente, ya que no protegen de nada, mientras que el modo dual evita instrucciones peligrosas y la protección de memoria evita que un proceso se salga de su memoria asignada.",
    "opts": [
      "No se puede prescindir de ninguno de los tres.",
      "Las interrupciones periódicas no son necesarias realmente, ya que no protegen de nada, mientras que el modo dual evita instrucciones peligrosas y la protección de memoria evita que un proceso se salga de su memoria asignada."
    ],
    "ans": 0,
    "ex": "Los tres mecanismos hardware son necesarios: el modo dual (protege instrucciones privilegiadas), la protección de memoria (aisla procesos), y el temporizador/interrupciones periódicas (impiden que un proceso monopolice la CPU indefinidamente).",
    "id": "base_117",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T1",
    "q": "Una ventaja de los sistemas operativos que tienen una estructura cliente-servidor respecto a los monolíticos es que:\na) Se pueden ejecutar sobre un mayor número de arquitecturas de ordenadores.\nb) Son más fáciles de depurar y verificar.",
    "opts": [
      "Se pueden ejecutar sobre un mayor número de arquitecturas de ordenadores.",
      "Son más fáciles de depurar y verificar."
    ],
    "ans": 1,
    "ex": "Los SO con estructura cliente-servidor (microkernel) tienen un núcleo mínimo, lo que los hace más fáciles de depurar, verificar y mantener. La portabilidad a distintas arquitecturas no es una ventaja específica de esta estructura.",
    "id": "base_118",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T1",
    "q": "¿Por qué un sistema operativo se puede ver como una máquina extendida o virtual?\na) Porque oculta los detalles del hardware real y presenta una nueva interfaz de la máquina que se usa a través de llamadas al sistema.\nb) Porque, además de permitir el acceso a bajo nivel al hardware por parte de los procesos en modo usuario, ofrece abstracciones adicionales que el hardware en sí mismo no posee.",
    "opts": [
      "Porque oculta los detalles del hardware real y presenta una nueva interfaz de la máquina que se usa a través de llamadas al sistema.",
      "Porque, además de permitir el acceso a bajo nivel al hardware por parte de los procesos en modo usuario, ofrece abstracciones adicionales que el hardware en sí mismo no posee."
    ],
    "ans": 0,
    "ex": "El SO se ve como máquina extendida porque oculta la complejidad del hardware y ofrece una interfaz más sencilla y potente (ficheros, procesos, sockets...) accesible mediante llamadas al sistema. Los procesos en modo usuario NO acceden directamente al hardware.",
    "id": "base_119",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "Un proceso suspendido-listo puede pasar a uno de los siguientes estados:\na) A listo cuando es reanudado.\nb) A suspendido-bloqueado cuando empieza a servirse su petición de E/S.",
    "opts": [
      "A listo cuando es reanudado.",
      "A suspendido-bloqueado cuando empieza a servirse su petición de E/S."
    ],
    "ans": 0,
    "ex": "Un proceso suspendido-listo está en memoria secundaria y no espera ningún evento. Cuando el SO decide reanudarlo, pasa a estado listo (se carga en memoria principal). No puede pasar a suspendido-bloqueado porque no tiene ninguna E/S pendiente.",
    "id": "base_120",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "El efecto convoy...\na) puede darse en un sistema que planifica el procesador con el algoritmo SJF.\nb) aparece en FCFS cuando varios procesos limitados por E/S tienen que estar esperando a que deje la CPU un proceso limitado por CPU.",
    "opts": [
      "puede darse en un sistema que planifica el procesador con el algoritmo SJF.",
      "aparece en FCFS cuando varios procesos limitados por E/S tienen que estar esperando a que deje la CPU un proceso limitado por CPU."
    ],
    "ans": 1,
    "ex": "El efecto convoy es exclusivo de FCFS: un proceso largo acapara la CPU mientras muchos procesos cortos (normalmente limitados por E/S) quedan bloqueados en la cola. SJF precisamente evita este efecto ejecutando primero los procesos más cortos.",
    "id": "base_121",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "En Unix, un proceso que se desbloquea se despierta en...\na) el núcleo del SO, tras la función/instrucción que hizo que se bloqueara en última instancia.\nb) la instrucción en el código de usuario detrás de la llamada al sistema que provocó que fuera bloqueado.",
    "opts": [
      "el núcleo del SO, tras la función/instrucción que hizo que se bloqueara en última instancia.",
      "la instrucción en el código de usuario detrás de la llamada al sistema que provocó que fuera bloqueado."
    ],
    "ans": 0,
    "ex": "En Unix, cuando un proceso se desbloquea, reanuda su ejecución en modo núcleo justo después de la instrucción (sleep o similar) que lo bloqueó. Solo cuando el núcleo termine de gestionar el desbloqueo, el proceso retornará a modo usuario.",
    "id": "base_122",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "En el algoritmo de planificación de procesos de múltiples colas con realimentación, la realimentación significa:\na) Que un proceso puede pasar de una cola a otra.\nb) Que un proceso puede pasar de una cola a otra y que además se puede cambiar la posición de un proceso en su cola en cualquier momento.",
    "opts": [
      "Que un proceso puede pasar de una cola a otra.",
      "Que un proceso puede pasar de una cola a otra y que además se puede cambiar la posición de un proceso en su cola en cualquier momento."
    ],
    "ans": 0,
    "ex": "La realimentación (feedback) en las colas multinivel significa que los procesos pueden moverse entre colas según su comportamiento (p.ej., si consumen mucho CPU bajan de prioridad). No implica reordenar procesos dentro de una misma cola.",
    "id": "base_123",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "Indica cuál de los siguientes es un motivo por el que se lanza obligatoriamente el planificador de procesos:\na) Se ejecuta una llamada al sistema.\nb) Finaliza un proceso.",
    "opts": [
      "Se ejecuta una llamada al sistema.",
      "Finaliza un proceso."
    ],
    "ans": 1,
    "ex": "Cuando un proceso finaliza, la CPU queda libre y el planificador DEBE ejecutarse obligatoriamente para asignar la CPU a otro proceso. Una llamada al sistema no implica necesariamente un cambio de proceso (muchas llamadas al sistema retornan al mismo proceso que las invocó).",
    "id": "base_124",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "En la creación de procesos en Unix:\na) Tras fork() tanto el proceso padre como el hijo tienen el mismo PID. exec() es la que le asigna un nuevo PID al proceso que la ejecuta.\nb) Tras fork() los procesos padre e hijo tienen diferente PID. exec() construye la nueva imagen del proceso a partir del ejecutable, sin alterar su PID.",
    "opts": [
      "Tras fork() tanto el proceso padre como el hijo tienen el mismo PID. exec() es la que le asigna un nuevo PID al proceso que la ejecuta.",
      "Tras fork() los procesos padre e hijo tienen diferente PID. exec() construye la nueva imagen del proceso a partir del ejecutable, sin alterar su PID."
    ],
    "ans": 1,
    "ex": "fork() crea un proceso hijo con un PID nuevo y diferente al del padre (fork() devuelve 0 al hijo y el PID del hijo al padre). exec() reemplaza la imagen del proceso (código, datos, pila) cargando un nuevo ejecutable, pero mantiene el mismo PID.",
    "id": "base_125",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "Un proceso por lotes tiene ráfagas: CPU(3) E/S(4) CPU(3). Llega en el instante 11 y termina en el 23. Entonces:\na) Su tiempo de retorno es 13 y su tiempo de espera 2.\nb) Su tiempo de retorno es 12 y su tiempo de espera 2.",
    "opts": [
      "Su tiempo de retorno es 13 y su tiempo de espera 2.",
      "Su tiempo de retorno es 12 y su tiempo de espera 2."
    ],
    "ans": 1,
    "ex": "Tiempo de retorno = instante_fin - instante_llegada = 23 - 11 = 12. Tiempo de CPU total = 3+3 = 6. Tiempo de E/S = 4. Tiempo de espera = retorno - CPU - E/S = 12 - 6 - 4 = 2.",
    "id": "base_126",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T2",
    "q": "Cola de listos: P1(ráfaga=4), P2(ráfaga=3), P3(ráfaga=5). Llega P4 (ráfaga=2) antes de que quede libre la CPU. ¿Cuándo tomará la CPU P4?\na) Como mucho, 8 unidades después de llegar, si se usa round-robin con quantum=2 y la CPU acaba de ser asignada a un proceso.\nb) Inmediatamente, expulsando al proceso en CPU, si el algoritmo es SRTF o prioridad apropiativo (P4 mayor prioridad).",
    "opts": [
      "Como mucho, 8 unidades después de llegar, si se usa round-robin con quantum=2 y la CPU acaba de ser asignada a un proceso.",
      "Inmediatamente, expulsando al proceso en CPU, si el algoritmo es SRTF o prioridad apropiativo (P4 mayor prioridad)."
    ],
    "ans": 0,
    "ex": "Con RR y quantum=2, si la CPU acaba de asignarse: espera 2 (resto del quantum actual) + 2 (P1 o siguiente) + 2 + 2 = 8 unidades como máximo. La opción b también sería cierta con SRTF o prioridad expropiativo, pero la opción a es la respuesta correcta del enunciado.",
    "id": "base_127",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T3",
    "q": "Un rootkit es un programa que permite un acceso continuo y privilegiado a un computador y, además:\na) Tiene la capacidad de extenderse a otros computadores conectados a su misma red.\nb) Es difícilmente detectable, incluso mediante un antivirus.",
    "opts": [
      "Tiene la capacidad de extenderse a otros computadores conectados a su misma red.",
      "Es difícilmente detectable, incluso mediante un antivirus."
    ],
    "ans": 1,
    "ex": "La característica definitoria del rootkit es su capacidad de ocultarse del SO y de las herramientas de detección (incluidos antivirus), lo que permite al atacante mantener acceso privilegiado sin ser descubierto. La capacidad de propagarse a otros ordenadores es característica de los gusanos (worms), no de los rootkits.",
    "id": "base_128",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T3",
    "q": "Una característica de las listas de posibilidades (capabilities) que no tienen las listas de control de acceso (ACL) es:\na) que se permiten operaciones con las posibilidades, como obtener una copia o eliminarlas.\nb) que es más sencillo recuperar todos los permisos de un objeto particular.",
    "opts": [
      "que se permiten operaciones con las posibilidades, como obtener una copia o eliminarlas.",
      "que es más sencillo recuperar todos los permisos de un objeto particular."
    ],
    "ans": 0,
    "ex": "Las capabilities (posibilidades) son tokens que pueden transferirse, copiarse o revocarse, lo que permite delegar derechos de acceso. Con ACL es más fácil ver todos los permisos de un objeto (la ACL está asociada al objeto), mientras que con capabilities esa consulta es más difícil.",
    "id": "base_129",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T3",
    "q": "Un dominio de seguridad:\na) Es un conjunto de parejas ⟨objeto, derechos⟩.\nb) Especifica los permisos que posee un usuario.",
    "opts": [
      "Es un conjunto de parejas ⟨objeto, derechos⟩.",
      "Especifica los permisos que posee un usuario."
    ],
    "ans": 0,
    "ex": "Un dominio de seguridad se define formalmente como un conjunto de parejas ⟨objeto, conjunto_de_derechos⟩, que indica qué operaciones puede realizar sobre qué objetos quien opera en ese dominio. No se asocia necesariamente a un usuario (puede asociarse a un proceso, rol, etc.).",
    "id": "base_130",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T3",
    "q": "Si tenemos un fichero con los permisos: usuario1 grupo2 rwsr-sr--:\na) si lo ejecuta usuario1 (perteneciente al grupo1), su grupo efectivo se convierte en grupo2 durante la ejecución.\nb) no puede ejecutarlo usuario2 (perteneciente al grupo2) porque no tiene permiso de ejecución (x) para el grupo.",
    "opts": [
      "si lo ejecuta usuario1 (perteneciente al grupo1), su grupo efectivo se convierte en grupo2 durante la ejecución.",
      "no puede ejecutarlo usuario2 (perteneciente al grupo2) porque no tiene permiso de ejecución (x) para el grupo."
    ],
    "ans": 0,
    "ex": "En 'rwsr-sr--': el propietario tiene rwx+SUID y el grupo tiene r-x+SGID (la 's' en posición de grupo con bit de ejecución activo). Cuando usuario1 lo ejecuta, el SGID activa el GID efectivo del proceso como grupo2. La opción b es falsa porque el grupo sí tiene permiso de ejecución (la 's' minúscula implica x activado).",
    "id": "base_131",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T3",
    "q": "En UNIX/Linux:\na) Un usuario puede pertenecer a varios dominios a la vez con distintos GID.\nb) Un usuario puede pertenecer a varios dominios a la vez con distintos UID y GID.",
    "opts": [
      "Un usuario puede pertenecer a varios dominios a la vez con distintos GID.",
      "Un usuario puede pertenecer a varios dominios a la vez con distintos UID y GID."
    ],
    "ans": 0,
    "ex": "En Unix, un usuario tiene un único UID pero puede pertenecer a múltiples grupos (GIDs suplementarios), por lo que puede operar en varios dominios con distintos GIDs simultáneamente. Los UIDs no se multiplican: un proceso tiene un UID real y uno efectivo, pero no varios UIDs a la vez.",
    "id": "base_132",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T3",
    "q": "Los privilegios de un usuario en un sistema:\na) dependen tanto de su identificador como de su contraseña.\nb) dependen únicamente de su identificador, ya que la contraseña solamente sirve para autenticarlo.",
    "opts": [
      "dependen tanto de su identificador como de su contraseña.",
      "dependen únicamente de su identificador, ya que la contraseña solamente sirve para autenticarlo."
    ],
    "ans": 1,
    "ex": "La contraseña sirve exclusivamente para autenticar al usuario (verificar que es quien dice ser). Una vez autenticado, los privilegios se determinan únicamente por su identificador (UID/GID). Dos usuarios con la misma contraseña pero diferente UID tendrán privilegios distintos.",
    "id": "base_133",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "En la implementación de ficheros y directorios en Unix, los bloques indirectos:\na) Los usan tanto los ficheros regulares como los directorios (si es necesario).\nb) Los usan los ficheros regulares (si es necesario), pero no los directorios.",
    "opts": [
      "Los usan tanto los ficheros regulares como los directorios (si es necesario).",
      "Los usan los ficheros regulares (si es necesario), pero no los directorios."
    ],
    "ans": 0,
    "ex": "En Unix, los directorios se implementan como ficheros ordinarios (su contenido son las entradas de directorio). Por tanto, usan la misma estructura de nodo-i con bloques directos e indirectos. Un directorio muy grande también puede necesitar bloques indirectos.",
    "id": "base_134",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "En la implementación de ficheros mediante lista ligada:\na) Se consiguen utilizar todos los bloques del disco.\nb) Se produce mucha fragmentación externa.",
    "opts": [
      "Se consiguen utilizar todos los bloques del disco.",
      "Se produce mucha fragmentación externa."
    ],
    "ans": 0,
    "ex": "Con lista ligada, cualquier bloque libre puede añadirse a cualquier fichero independientemente de su posición en disco, por lo que se usan todos los bloques disponibles (no hay fragmentación externa). El inconveniente es el acceso aleatorio lento y que parte del bloque la ocupa el puntero al siguiente.",
    "id": "base_135",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "Un fichero ejecutable que contiene código máquina es un fichero binario cuyo formato debe conocer:\na) Sólo el compilador-enlazador que genera dicho fichero binario.\nb) Tanto el compilador-enlazador que lo genera como el sistema operativo donde se utiliza.",
    "opts": [
      "Sólo el compilador-enlazador que genera dicho fichero binario.",
      "Tanto el compilador-enlazador que lo genera como el sistema operativo donde se utiliza."
    ],
    "ans": 1,
    "ex": "El SO necesita conocer el formato del ejecutable (p.ej. ELF en Linux, PE en Windows) para cargarlo correctamente en memoria: localizar el punto de entrada, las secciones de código y datos, las bibliotecas dinámicas necesarias, etc. No basta con que solo lo conozca el compilador-enlazador.",
    "id": "base_136",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "El campo 'enlaces' de un nodo-i:\na) guarda el número de subdirectorios en el caso del nodo-i del directorio raíz.\nb) guarda el número de entradas en directorios con ese nodo-i.",
    "opts": [
      "guarda el número de subdirectorios en el caso del nodo-i del directorio raíz.",
      "guarda el número de entradas en directorios con ese nodo-i."
    ],
    "ans": 1,
    "ex": "El campo de enlaces (link count) de un nodo-i cuenta el número de entradas de directorio que apuntan a ese nodo-i, es decir, el número de nombres (hard links) que tiene el fichero. En el caso de un directorio, cada subdirectorio añade 1 (por la entrada '..'), pero el campo no cuenta subdirectorios exclusivamente.",
    "id": "base_137",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "¿En qué implementación de directorios pueden aparecer huecos libres entre entradas de directorio?\na) Tanto en la implementación de directorios de Unix como en la de MS-DOS.\nb) Sólo en la implementación de directorios de Unix.",
    "opts": [
      "Tanto en la implementación de directorios de Unix como en la de MS-DOS.",
      "Sólo en la implementación de directorios de Unix."
    ],
    "ans": 1,
    "ex": "En Unix, las entradas de directorio tienen longitud variable, por lo que al eliminar una entrada pueden quedar huecos de tamaño arbitrario entre entradas. En MS-DOS las entradas tienen tamaño fijo y al borrar se marca con un byte especial (0xE5), pero no quedan huecos de tamaño variable porque las entradas son todas iguales.",
    "id": "base_138",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "El número máximo de bloques lógicos que se deben leer de disco para copiar en memoria el bloque N de un fichero es:\na) 1 en asignación contigua.\nb) N−2 con listas ligadas.",
    "opts": [
      "1 en asignación contigua.",
      "N−2 con listas ligadas."
    ],
    "ans": 0,
    "ex": "Con asignación contigua, conociendo el bloque inicial del fichero, se calcula directamente la posición del bloque N: basta 1 lectura. Con lista ligada hay que recorrer los N bloques desde el inicio para llegar al bloque N (no N-2). La opción a es correcta; la b es falsa porque son N lecturas, no N-2.",
    "id": "base_139",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "Si queremos escribir un byte en la posición 4.500.000 (desde 0) de un fichero de 10 MB implementado con lista ligada sin índice, bloques de 4 kB y punteros de 4 bytes:\na) Leer 1100 bloques y escribir 2 bloques.\nb) Leer 1100 bloques y escribir 1 bloque.",
    "opts": [
      "Leer 1100 bloques y escribir 2 bloques.",
      "Leer 1100 bloques y escribir 1 bloque."
    ],
    "ans": 1,
    "ex": "Bytes útiles por bloque = 4096 - 4 = 4092. Bloque que contiene la posición 4.500.000: floor(4.500.000 / 4092) = 1099. Para llegar al bloque 1099 hay que leer los bloques 0 a 1099 = 1100 lecturas. Luego se modifica y escribe solo ese bloque = 1 escritura.",
    "id": "base_140",
    "source": "Examen Oficial UMU"
  },
  {
    "t": "T4",
    "q": "Añadir un bloque al final de un fichero de 10 MB con nodos-i de 13 direcciones (10 directas, 1 BSI, 1 BDI, 1 BTI), bloques de 4 kB, punteros de 4 bytes y el nodo-i ya en memoria:\na) Leer 2 bloques y escribir 1 bloque.\nb) Leer 2 bloques y escribir 2 bloques.",
    "opts": [
      "Leer 2 bloques y escribir 1 bloque.",
      "Leer 2 bloques y escribir 2 bloques."
    ],
    "ans": 1,
    "ex": "El fichero tiene 2560 bloques (10 MB / 4 kB). El bloque 2560 cae en la zona de doble indirecto (BDI). El bloque de primer nivel del BDI ya existe (el bloque 2559 también está en él). Hay que: leer el BDI (1 lectura) + leer el bloque de segundo nivel (1 lectura) + escribir el nuevo bloque de datos (1 escritura) + escribir el bloque de segundo nivel actualizado (1 escritura) = 2 lecturas, 2 escrituras.",
    "id": "base_141",
    "source": "Examen Oficial UMU"
  },
  {
    "id": "pdf_t1_1",
    "t": "T1",
    "source": "Cuestionario Teoría T1",
    "q": "El sistema operativo entra en ejecución únicamente cuando un programa de usuario así lo solicita mediante una llamada al sistema.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. El SO toma el control de la CPU no solo por llamadas al sistema (software), sino también por interrupciones hardware periódicas (ej. temporizador/reloj para evitar monopolio de CPU) y por excepciones de programa (división por cero, fallo de página, etc.)."
  },
  {
    "id": "pdf_t1_2",
    "t": "T1",
    "source": "Cuestionario Teoría T1",
    "q": "El mecanismo de spoolers permite incrementar la utilización de la CPU solapando el tiempo de cómputo de un programa con su tiempo de E/S.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. El mecanismo que permite el solapamiento del cómputo de un programa con la E/S de ese mismo programa son los buffers (buffering). El spooling solapa el cómputo de un proceso con la E/S de otros procesos o trabajos mediante almacenamiento intermedio en disco."
  },
  {
    "id": "pdf_t1_3",
    "t": "T1",
    "source": "Cuestionario Teoría T1",
    "q": "Para garantizar un funcionamiento correcto, el sistema operativo ha de poder ejecutarse al menos en dos modos, el modo núcleo y el modo usuario.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. Es el procesador (hardware) el que debe contar con al menos dos modos de funcionamiento (modo dual). El sistema operativo en sí mismo siempre se ejecuta en modo núcleo (supervisor); las aplicaciones de usuario se ejecutan en modo usuario."
  },
  {
    "id": "pdf_t1_4",
    "t": "T1",
    "source": "Cuestionario Teoría T1",
    "q": "La multitarea permite que varios usuarios puedan interactuar con la máquina a la vez, con la sensación de que su programa se ejecuta en exclusiva.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 0,
    "ex": "Verdadero. La multitarea (tiempo compartido) conmuta la CPU con tanta rapidez entre los procesos activos que proporciona a cada usuario la ilusión de interactuar en exclusiva con la máquina."
  },
  {
    "id": "pdf_t1_5",
    "t": "T1",
    "source": "Cuestionario Teoría T1",
    "q": "El concepto de transparencia de la localización en un sistema operativo distribuido significa que el sistema operativo se puede ejecutar en cualquiera de las máquinas que componen el sistema, sin que el usuario sepa dónde.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. La transparencia de localización significa que los usuarios y aplicaciones acceden a los recursos (ficheros, impresoras, servicios) usando nombres lógicos sin necesidad de conocer en qué máquina física se encuentran ubicados."
  },
  {
    "id": "pdf_t1_6",
    "t": "T1",
    "source": "Cuestionario Teoría T1",
    "q": "La unidad de trabajo del sistema operativo es el proceso, que en general no es más que una entidad pasiva: un programa almacenado en disco.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. El proceso es una entidad activa: un programa en ejecución con contador de programa, registros y espacio de memoria asignado. La entidad pasiva almacenada en disco es el programa."
  },
  {
    "id": "pdf_t1_7",
    "t": "T1",
    "source": "Cuestionario Teoría T1",
    "q": "Los programas del sistema que acompañan al sistema operativo (por ejemplo bash) se ejecutan en modo núcleo del procesador puesto que forman parte del sistema operativo.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. Los programas del sistema como bash, ls, editores, etc., se ejecutan enteramente en modo usuario del procesador y acceden a las funciones del núcleo a través de llamadas al sistema (syscalls)."
  },
  {
    "id": "pdf_t1_8",
    "t": "T1",
    "source": "Cuestionario Teoría T1",
    "q": "En un sistema operativo con estructura interna del tipo cliente-servidor (micronúcleo), los distintos procesos servidores que implementan la administración de procesos, memoria, sistema de ficheros, etc., se ejecutan en modo usuario del procesador.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 0,
    "ex": "Verdadero. En la arquitectura micronúcleo, solo un conjunto mínimo de primitivas (gestión básica de hilos, IPC, gestión básica de interrupciones) corre en modo núcleo; todos los subsistemas servidores se ejecutan como procesos normales en modo usuario."
  },
  {
    "id": "pdf_t1_9",
    "t": "T1",
    "source": "Cuestionario Teoría T1",
    "q": "El componente del sistema operativo que habilita directamente el concepto de multitarea es el módulo de administración de procesos.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 0,
    "ex": "Verdadero. El módulo de administración de procesos (planificador y despachador de CPU) se encarga de conmutar la CPU entre procesos, implementando de forma directa la multitarea."
  },
  {
    "id": "pdf_t1_10",
    "t": "T1",
    "source": "Cuestionario Teoría T1",
    "q": "Cuando un programa de usuario realiza una llamada al sistema, la instrucción que sigue a dicha llamada al sistema en ese mismo programa de usuario se ejecutará en modo núcleo, para poder recoger los resultados de la llamada al sistema.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. Antes de retornar el control a la siguiente instrucción del programa de usuario, el procesador vuelve automáticamente a modo usuario. El código del usuario jamás se ejecuta en modo núcleo."
  },
  {
    "id": "pdf_t2_1",
    "t": "T2",
    "source": "Cuestionario Teoría T2",
    "q": "Un proceso limitado por entrada/salida (E/S) suele tener ráfagas de CPU de corta duración.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 0,
    "ex": "Verdadero. Los procesos limitados por E/S (I/O bound) realizan cómputos breves antes de solicitar una operación de E/S, pasando la mayor parte de su tiempo esperando transferencias de datos."
  },
  {
    "id": "pdf_t2_2",
    "t": "T2",
    "source": "Cuestionario Teoría T2",
    "q": "Con respecto a los estados de los procesos (Nuevo, Ejecución, Listo, Bloqueado y Saliente), se puede pasar del estado Bloqueado al estado Saliente directamente.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 0,
    "ex": "Verdadero. Si un proceso que se encuentra bloqueado a la espera de un evento recibe una señal de terminación forzosa (por ejemplo SIGKILL) o sufre una condición de aborto, transita directamente de Bloqueado a Saliente (Terminado)."
  },
  {
    "id": "pdf_t2_3",
    "t": "T2",
    "source": "Cuestionario Teoría T2",
    "q": "En un sistema que cuenta con una planificación a corto plazo round-robin, si tenemos un proceso A en estado «listo» y un proceso B en estado «bloqueado», el proceso A siempre pasará a estado «en ejecución» antes que el B.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 0,
    "ex": "Verdadero. Un proceso bloqueado no puede ser elegido por el planificador de la CPU. Para poder ejecutar, el proceso B debe primero desbloquearse y entrar al final de la cola de listos, por lo que A (que ya está listo) siempre ejecutará antes."
  },
  {
    "id": "pdf_t2_4",
    "t": "T2",
    "source": "Cuestionario Teoría T2",
    "q": "La única diferencia entre SJF (Shortest Job First) y SRTF (Shortest Remaining Time First) es que el primero es no apropiativo, mientras que el segundo es apropiativo.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 0,
    "ex": "Verdadero. Ambos buscan el trabajo más corto; SJF deja que el proceso ejecute hasta terminar su ráfaga (no apropiativo), mientras que SRTF expropia la CPU si llega un nuevo proceso cuyo tiempo restante estimado es menor que el del que está en ejecución (apropiativo)."
  },
  {
    "id": "pdf_t2_5",
    "t": "T2",
    "source": "Cuestionario Teoría T2",
    "q": "En una implementación de hilos a nivel de usuario (ULT), si el hilo de un proceso realiza una llamada al sistema bloqueante, se bloquearán solamente el hilo que hizo la llamada y aquellos otros hilos del proceso que dependan de la resolución de dicha llamada.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. En ULT el núcleo del SO desconoce la existencia de los hilos internos del proceso. Al realizar una syscall bloqueante, el núcleo bloquea al proceso completo, paralizando a TODOS sus hilos."
  },
  {
    "id": "pdf_t2_6",
    "t": "T2",
    "source": "Cuestionario Teoría T2",
    "q": "La comunicación entre hilos de un proceso de usuario se hace siempre sin intervención del núcleo del sistema operativo, utilizando directamente el espacio de direcciones del proceso.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 0,
    "ex": "Verdadero. Todos los hilos de un mismo proceso comparten el mismo espacio de direcciones (variables globales, heap, datos), por lo que pueden comunicarse leyendo y escribiendo directamente en memoria sin necesidad de llamar al núcleo."
  },
  {
    "id": "pdf_t2_7",
    "t": "T2",
    "source": "Cuestionario Teoría T2",
    "q": "Uno de los problemas de la planificación FIFO (FCFS) es que reduce la eficacia en el uso de la CPU al incrementar el tiempo de retorno de los procesos.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. FIFO no reduce la eficacia/utilización de la CPU (la CPU se mantiene ocupada al 100% mientras haya procesos listos). El problema es que perjudica notablemente el tiempo medio de retorno y espera debido al efecto convoy."
  },
  {
    "id": "pdf_t2_8",
    "t": "T2",
    "source": "Cuestionario Teoría T2",
    "q": "En Unix, cuando un proceso de usuario realiza una llamada al sistema, se produce un cambio de proceso en CPU: el proceso de usuario pasa a estado bloqueado mientras que el proceso del sistema operativo toma el control en modo núcleo para atender dicha llamada.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. No se produce un cambio de proceso: se produce un cambio de MODO (de modo usuario a modo núcleo) dentro del contexto del mismo proceso. El SO no es un proceso independiente que desplace al usuario para atender la llamada."
  },
  {
    "id": "pdf_t2_9",
    "t": "T2",
    "source": "Cuestionario Teoría T2",
    "q": "En relación con los estados de un proceso, un proceso pasa directamente de estado «bloqueado» a estado «en ejecución» cuando el evento externo que está esperando ya ha finalizado exitosamente, con lo que dicho proceso puede continuar su ejecución.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. Cuando el evento termina, el proceso pasa de Bloqueado a LISTO. No pasa directamente a Ejecución; debe esperar en la cola de listos a que el planificador le asigne la CPU."
  },
  {
    "id": "pdf_t2_10",
    "t": "T2",
    "source": "Cuestionario Teoría T2",
    "q": "En Unix, cada vez que ocurre un cambio de contexto sucede también un cambio de proceso.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. Al atender una llamada al sistema o una interrupción, hay que guardar el contexto de ejecución (registros, PC) para ejecutar la rutina del núcleo, pero se sigue en el mismo proceso (cambio de contexto sin cambio de proceso)."
  },
  {
    "id": "pdf_t2_11",
    "t": "T2",
    "source": "Cuestionario Teoría T2",
    "q": "En la planificación de procesos de múltiples niveles con realimentación (MLFQ), cada nivel puede indicar una prioridad y se aplica un algoritmo de planificación que puede ser distinto en cada nivel.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 0,
    "ex": "Verdadero. En colas multinivel con realimentación, cada cola suele tener distinta prioridad y puede usar su propio algoritmo (por ejemplo, Round Robin con quantum q0 en la cola superior y FCFS en la cola inferior)."
  },
  {
    "id": "pdf_t2_12",
    "t": "T2",
    "source": "Cuestionario Teoría T2",
    "q": "En la planificación round robin con quantum «q» y «n» procesos en el sistema, el tiempo que un proceso permanece bloqueado como máximo es (n-1) * q.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. La fórmula (n-1)*q acota el tiempo máximo de ESPERA en la cola de LISTOS hasta recibir el turno de CPU, no el tiempo que un proceso permanece bloqueado (que depende del dispositivo de E/S o evento externo, no del quantum)."
  },
  {
    "id": "pdf_t2_13",
    "t": "T2",
    "source": "Cuestionario Teoría T2",
    "q": "Una desventaja de los hilos implementados por el núcleo (KLT) de un sistema operativo es que los hilos que pertenecen a un mismo proceso no pueden ejecutarse en diferentes CPUs.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. Al contrario: precisamente una de las mayores ventajas de los hilos de núcleo (KLT) es que el núcleo puede planificar hilos del mismo proceso simultáneamente en diferentes núcleos o CPUs físicas."
  },
  {
    "id": "pdf_t2_14",
    "t": "T2",
    "source": "Cuestionario Teoría T2",
    "q": "El PCB (Process Control Block o BCP) de un proceso de usuario contiene todo aquello que está relacionado con dicho proceso: su código, sus datos, su pila, etc.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. El BCP contiene solo los METADATOS de control y gestión del proceso (PID, estado, registros de CPU, punteros a memoria, prioridad, ficheros abiertos). El código, datos y pila residen en el espacio de memoria (segmentos) del proceso, no dentro del BCP."
  },
  {
    "id": "pdf_t2_15",
    "t": "T2",
    "source": "Cuestionario Teoría T2",
    "q": "En Unix, la llamada al sistema exec() crea un nuevo proceso que es una copia idéntica del proceso que hace la llamada.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. La llamada que crea una copia/clon del proceso es fork(). La llamada exec() no crea un proceso nuevo; reemplaza la imagen ejecutable (código, datos, pila) del proceso actual por un nuevo programa, conservando su PID."
  },
  {
    "id": "pdf_t3_1",
    "t": "T3",
    "source": "Cuestionario Teoría T3",
    "q": "Se puede atentar contra la confidencialidad de los datos de un sistema de información mediante la intercepción de estos.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 0,
    "ex": "Verdadero. La intercepción (acceso no autorizado a la información mediante escucha, lectura o copia indebida) vulnera directamente el principio de confidencialidad."
  },
  {
    "id": "pdf_t3_2",
    "t": "T3",
    "source": "Cuestionario Teoría T3",
    "q": "De cara a la revocación (o cancelación) de un permiso, resulta más sencillo hacerlo con las listas de control de acceso (ACLs) que con las listas de posibilidades (capacidades), dado que con las segundas la información sobre los permisos de un objeto se encuentra distribuida en el sistema.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 0,
    "ex": "Verdadero. En las ACLs los permisos están centralizados en el propio objeto: basta modificar su lista. En listas de posibilidades/capacidades los derechos están dispersos en las tablas de cada dominio o proceso, requiriendo una costosa búsqueda global para revocar un permiso."
  },
  {
    "id": "pdf_t3_3",
    "t": "T3",
    "source": "Cuestionario Teoría T3",
    "q": "Desde un punto de vista teórico, es cierto que un objeto puede pertenecer a varios dominios pero siempre con los mismos derechos de acceso.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. Un objeto puede figurar en múltiples dominios con DERECHOS DISTINTOS en cada uno (por ejemplo, en el dominio de administración puede tener derechos de lectura y escritura, y en el de usuarios comunes solo de lectura)."
  },
  {
    "id": "pdf_t3_4",
    "t": "T3",
    "source": "Cuestionario Teoría T3",
    "q": "Las listas de posibilidades (capacidades) asocian a cada objeto una lista de los dominios que pueden acceder al objeto, junto con una indicación de las operaciones permitidas en cada caso.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. Esa es la definición de las Listas de Control de Acceso (ACLs). Las listas de posibilidades (C-Lists) asocian a cada DOMINIO o sujeto una lista de objetos a los que puede acceder junto con las operaciones permitidas (filas de la matriz de acceso)."
  },
  {
    "id": "pdf_t3_5",
    "t": "T3",
    "source": "Cuestionario Teoría T3",
    "q": "En relación a la seguridad en Unix, se implementan ACLs restringidas, ya que se especifica en cada fichero qué permisos tienen determinados grupos de usuarios sobre ese fichero.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 0,
    "ex": "Verdadero. En Unix estándar se implementan ACLs restringidas a tres categorías fijas de usuarios: propietario (u), grupo propietario (g) y resto/otros (o)."
  },
  {
    "id": "pdf_t3_6",
    "t": "T3",
    "source": "Cuestionario Teoría T3",
    "q": "Con respecto a la protección en un sistema de información, un dominio de protección representa un conjunto de procesos con un conjunto de permisos.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. Un dominio de protección se define formalmente como un conjunto de parejas (objeto, derechos de acceso). Especifica qué operaciones puede realizar un proceso que se ejecuta bajo dicho dominio sobre los distintos objetos del sistema."
  },
  {
    "id": "pdf_t3_7",
    "t": "T3",
    "source": "Cuestionario Teoría T3",
    "q": "En Unix, el cambio del usuario propietario de un fichero puede realizarse por parte del usuario propietario del mismo usando la orden «chown».",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. En sistemas Unix estándar tipo POSIX, la orden chown está restringida EXCLUSIVAMENTE al superusuario (root) por razones de seguridad (evitar sortear cuotas de disco o crear ejecutables setuid trampa)."
  },
  {
    "id": "pdf_t3_8",
    "t": "T3",
    "source": "Cuestionario Teoría T3",
    "q": "En Unix, si un fichero tiene el permiso de escritura habilitado para el resto de usuarios, inmediatamente después de que el usuario propietario elimine dicho permiso de escritura ningún proceso del resto de usuarios podrá escribirlo.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. La comprobación de permisos de acceso en Unix se realiza en el momento de la llamada open(). Si un proceso ya tenía el fichero abierto con modo de escritura antes de modificarse los permisos, mantendrá su descriptor válido y podrá seguir escribiendo en él."
  },
  {
    "id": "pdf_t3_9",
    "t": "T3",
    "source": "Cuestionario Teoría T3",
    "q": "En Unix, si un fichero ejecutable tiene activo el bit SETUID, al ejecutarse este fichero se ejecuta siempre con los privilegios del usuario propietario del fichero.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 0,
    "ex": "Verdadero. El bit SETUID hace que el identificador de usuario efectivo (EUID) del proceso pase a ser el del propietario del archivo ejecutable durante su ejecución (ej. el comando passwd pertenece a root)."
  },
  {
    "id": "pdf_t3_10",
    "t": "T3",
    "source": "Cuestionario Teoría T3",
    "q": "Los privilegios de un usuario en un sistema dependen tanto de su identificador como de su contraseña.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. La contraseña solo interviene en la fase de autenticación (verificar la identidad al iniciar sesión). Una vez autenticado, los privilegios y accesos en el sistema dependen únicamente del identificador de usuario (UID) y de sus grupos (GIDs)."
  },
  {
    "id": "pdf_t4_1",
    "t": "T4",
    "source": "Cuestionario Teoría T4",
    "q": "En relación a la ruta de acceso a un fichero, si el directorio actual es /home/alumno/apuntes/iso y queremos acceder al fichero /home/alumno/apuntes/poo/tema1.pdf, podemos utilizar la ruta: ./../../apuntes/poo/tema1.pdf.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 0,
    "ex": "Verdadero. Desde /home/alumno/apuntes/iso, subir dos niveles (../../) nos sitúa en /home/alumno; desde allí /apuntes/poo/tema1.pdf llega exactamente a la ruta destino."
  },
  {
    "id": "pdf_t4_2",
    "t": "T4",
    "source": "Cuestionario Teoría T4",
    "q": "Dado un sistema de ficheros UNIX, con una estructura de nodo-i con 10 punteros directos, 1 BSI, 1 BDI y 1 BTI y direcciones de disco de 4 bytes, un fichero de tamaño 267 KiB necesitará un total de 268 bloques en la zona de datos si el tamaño de bloque utilizado es 1 KiB.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. El fichero ocupa ceil(267 KiB / 1 KiB) = 267 bloques de DATOS. Además necesitará bloques de indirección (metadatos): 10 directos + 256 en BSI = 266 bloques. El bloque 267 cae en el BDI, requiriendo 1 bloque BSI + 1 bloque BDI nivel 1 + 1 bloque BDI nivel 2 (3 bloques de indirección adicionales). En total en disco ocupa 270 bloques, pero en la zona de datos estrictamente son 267, no 268."
  },
  {
    "id": "pdf_t4_3",
    "t": "T4",
    "source": "Cuestionario Teoría T4",
    "q": "En un sistema Unix con N nodos-i y B bloques para la zona de datos, donde B > N, el número máximo de ficheros que podría albergar sería B, suponiendo que cada fichero ocupase como máximo 1 bloque de datos.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. Cada fichero requiere obligatoriamente un nodo-i exclusivo en disco. Si hay N nodos-i, el sistema no puede albergar más de N ficheros en ningún caso, aunque sobre espacio en los bloques de datos (B > N)."
  },
  {
    "id": "pdf_t4_4",
    "t": "T4",
    "source": "Cuestionario Teoría T4",
    "q": "En una implementación de ficheros mediante nodos-i con 12 punteros directos, 1 BSI, 1 BDI y 1 BTI, si cada bloque indirecto almacena 256 punteros, entonces la dirección del bloque 268 del fichero (numerados desde el cero) se obtendrá a partir del bloque doblemente indirecto apuntado por el nodo-i.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 0,
    "ex": "Verdadero. Punteros directos cubren los bloques 0 a 11 (12 bloques). El BSI cubre los siguientes 256 bloques (bloques 12 a 267). El bloque 268 es el primero que debe resolverse obligatoriamente a través del Bloque Doble Indirecto (BDI)."
  },
  {
    "id": "pdf_t4_5",
    "t": "T4",
    "source": "Cuestionario Teoría T4",
    "q": "En un sistema de ficheros basado en nodos-i, para leer un byte determinado de un fichero, la selección de los bloques de metadatos que hay que llevar a memoria depende de la posición relativa del byte dentro del fichero.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 0,
    "ex": "Verdadero. Dependiendo de la posición relativa del byte (su número de bloque lógico NL = floor(byte/B)), los metadatos necesarios pueden estar directamente en el nodo-i (en memoria), o requerir leer el BSI, el BDI o el BTI de disco."
  },
  {
    "id": "pdf_t4_6",
    "t": "T4",
    "source": "Cuestionario Teoría T4",
    "q": "Los sistemas operativos actuales requieren de nombres estructurados para los ficheros, en los cuales los caracteres que hay después del «.» representan la extensión obligatoria.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. En los sistemas operativos modernos (Unix, Linux, macOS e incluso internamente en Windows), los nombres de fichero son secuencias arbitrarias de caracteres. La extensión tras el punto es una convención para el usuario o aplicaciones, no un requisito obligatorio del sistema de ficheros."
  },
  {
    "id": "pdf_t4_7",
    "t": "T4",
    "source": "Cuestionario Teoría T4",
    "q": "La operación truncate en un fichero elimina el contenido de un fichero completamente, pero sin llegar a eliminar el fichero en sí.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 0,
    "ex": "Verdadero. La llamada truncate() o ftruncate() libera todos los bloques de datos asignados al fichero (fijando su tamaño a 0 o al valor especificado), pero conserva el nodo-i, sus atributos, permisos y su entrada en el directorio."
  },
  {
    "id": "pdf_t4_8",
    "t": "T4",
    "source": "Cuestionario Teoría T4",
    "q": "En el método de implantación de ficheros mediante listas ligadas con índice (FAT) nunca aparecerá fragmentación externa.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 0,
    "ex": "Verdadero. Al igual que en las listas ligadas simples y los nodos-i, cualquier bloque libre del disco puede ser asignado a cualquier fichero sin requerir contigüidad física. Por tanto, no existe fragmentación externa (solo fragmentación interna en el último bloque de cada fichero)."
  },
  {
    "id": "pdf_t4_9",
    "t": "T4",
    "source": "Cuestionario Teoría T4",
    "q": "En Unix, si suponemos que cualquier directorio ocupa exactamente un bloque de datos y que solo el nodo-i del directorio raíz se encuentra ya en memoria, para obtener el tamaño del fichero /usr/lib/libm.so.2 se requerirían 7 accesos a disco.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. Desglose de accesos: 1) Leer bloque de datos de / (1 acceso); 2) Leer nodo-i de 'usr' (1); 3) Leer bloque de datos de 'usr' (1); 4) Leer nodo-i de 'lib' (1); 5) Leer bloque de datos de 'lib' (1); 6) Leer nodo-i del fichero 'libm.so.2' (1). El tamaño está en el nodo-i del fichero, por lo que NO hay que leer su bloque de datos. En total son exactamente 6 accesos a disco, no 7."
  },
  {
    "id": "pdf_t4_10",
    "t": "T4",
    "source": "Cuestionario Teoría T4",
    "q": "En una implementación de ficheros con asignación mediante lista ligada sin índice, para modificar un byte perteneciente al bloque X de un fichero serán siempre necesarias únicamente dos operaciones de disco: una para leer el bloque X y otra posterior para sobreescribir dicho bloque.",
    "opts": [
      "Verdadero",
      "Falso"
    ],
    "ans": 1,
    "ex": "Falso. En una lista ligada sin índice, para acceder al bloque X hay que recorrer secuencialmente todos los bloques previos (desde el bloque 0 hasta el X), lo que requiere leer X+1 bloques de disco. No son únicamente 2 operaciones salvo si X=0."
  },
  {
    "id": "hy_t1_1",
    "t": "T1",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "En relación a las transiciones entre modos de ejecución de la CPU, ¿cuál de las siguientes afirmaciones es correcta?",
    "opts": [
      "El paso de modo usuario a modo núcleo puede realizarse mediante una instrucción ordinaria de salto incondicional (jmp) ejecutada por la aplicación.",
      "El paso de modo usuario a modo núcleo se produce mediante un mecanismo hardware (interrupción, excepción o trampa de llamada al sistema), mientras que el retorno a modo usuario se realiza mediante una instrucción máquina privilegiada."
    ],
    "ans": 1,
    "ex": "El procesador solo cambia de modo usuario a núcleo mediante eventos hardware o trampas (trap/sysenter/syscall). Una aplicación de usuario no puede saltar arbitrariamente a código del núcleo con jmp. Para volver a modo usuario, el SO ejecuta una instrucción privilegiada de retorno (como iret o sysret)."
  },
  {
    "id": "hy_t1_2",
    "t": "T1",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "Respecto a los sistemas operativos con arquitectura monolítica frente a micronúcleo:",
    "opts": [
      "En el micronúcleo, un fallo o cuelgue en el manejador del sistema de ficheros bloquea inmediatamente todo el núcleo del sistema operativo.",
      "En el diseño monolítico la comunicación entre componentes internos es muy rápida porque se realiza mediante llamadas directas a funciones en el mismo espacio de direcciones del núcleo."
    ],
    "ans": 1,
    "ex": "En la arquitectura monolítica todos los servicios (gestión de procesos, memoria, red, ficheros) residen en el mismo espacio del núcleo, comunicándose directamente mediante llamadas a función sin cambios de contexto. En un micronúcleo, si el servidor de ficheros falla, puede reiniciarse como un proceso de usuario sin tumbar el núcleo."
  },
  {
    "id": "hy_t1_3",
    "t": "T1",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "¿Cuál de las siguientes instrucciones del procesador debe ser forzosamente una instrucción privilegiada?",
    "opts": [
      "Modificar el registro de máscara de interrupciones o deshabilitar interrupciones.",
      "Realizar una operación aritmética de coma flotante de alta precisión."
    ],
    "ans": 0,
    "ex": "Deshabilitar las interrupciones del hardware es una operación crítica que solo puede realizar el sistema operativo en modo núcleo. Si un proceso de usuario pudiera deshabilitarlas, podría monopolizar la CPU indefinidamente impidiendo la intervención del temporizador del SO."
  },
  {
    "id": "hy_t1_4",
    "t": "T1",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "La principal diferencia entre la multiprogramación y la multitarea (tiempo compartido) radica en:",
    "opts": [
      "La multiprogramación busca maximizar la utilización de la CPU solapando ráfagas de E/S y cómputo de varios procesos, mientras que la multitarea busca proporcionar interactividad y tiempos de respuesta rápidos a los usuarios mediante rodajas de tiempo.",
      "La multitarea solo funciona en sistemas que disponen de dos o más procesadores físicos independientes."
    ],
    "ans": 0,
    "ex": "La multiprogramación nació para no desaprovechar la CPU durante las largas esperas de E/S. La multitarea (time-sharing) incorpora el concepto de tiempo compartido (quantum) para permitir interacción concurrente de usuarios en tiempo real, incluso sobre una única CPU."
  },
  {
    "id": "hy_t2_1",
    "t": "T2",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "En el modelo clásico de 5 estados de un proceso (Nuevo, Listo, Ejecución, Bloqueado, Saliente), ¿cuál de las siguientes transiciones es IMPOSIBLE?",
    "opts": [
      "De Bloqueado a Ejecución.",
      "De Ejecución a Listo."
    ],
    "ans": 0,
    "ex": "Un proceso que se desbloquea tras finalizar su E/S nunca pasa directamente a Ejecución; siempre debe incorporarse a la cola de LISTOS para que el planificador de la CPU le asigne el turno. La transición de Ejecución a Listo sí es habitual (fin de quantum de reloj)."
  },
  {
    "id": "hy_t2_2",
    "t": "T2",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "En el algoritmo de planificación Round Robin (RR), si el valor del quantum 'q' tiende a infinito:",
    "opts": [
      "El algoritmo se comporta exactamente igual que FCFS (First-Come, First-Served).",
      "El algoritmo se comporta exactamente igual que SJF apropiativo (SRTF)."
    ],
    "ans": 0,
    "ex": "Si el quantum q es mayor que la duración de cualquier ráfaga de CPU de los procesos, ningún proceso será expropiado por el reloj, ejecutándose cada uno hasta terminar o bloquearse por orden de llegada (comportamiento idéntico a FCFS)."
  },
  {
    "id": "hy_t2_3",
    "t": "T2",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "En la estimación exponencial de ráfagas para SJF/SRTF mediante la fórmula E(n+1) = α·T(n) + (1-α)·E(n), si se fija α = 0:",
    "opts": [
      "Las estimaciones futuras ignoran por completo la historia previa y solo toman en cuenta la última ráfaga real observada.",
      "Las estimaciones futuras ignoran por completo las mediciones recientes y la estimación permanece constante e invariable en el valor inicial E1."
    ],
    "ans": 1,
    "ex": "Si α = 0, E(n+1) = 0·T(n) + 1·E(n) = E(n) = ... = E1. La estimación nunca cambia y las ráfagas reales recientes carecen de efecto. Si α = 1, solo contaría la ráfaga más reciente T(n)."
  },
  {
    "id": "hy_t2_4",
    "t": "T2",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "Con respecto a la comparación entre hilos a nivel de usuario (ULT) e hilos a nivel de núcleo (KLT):",
    "opts": [
      "La conmutación entre hilos ULT es mucho más rápida que entre KLT porque no requiere cruzar al modo núcleo ni realizar una llamada al sistema.",
      "Los hilos ULT pueden ejecutarse en paralelo simultáneo sobre diferentes núcleos físicos de procesamiento en un sistema multiprocesador."
    ],
    "ans": 0,
    "ex": "En ULT la conmutación la realiza una biblioteca en espacio de usuario modificando registros y pilas en memoria, sin salto a modo núcleo. Su gran limitación es que el SO ve un único proceso monohilo y no puede asignar diferentes hilos ULT a diferentes cores."
  },
  {
    "id": "hy_t2_5",
    "t": "T2",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "En Unix, tras ejecutar la llamada al sistema pid = fork():",
    "opts": [
      "La variable 'pid' toma el valor 0 en el proceso hijo, y el PID del hijo (entero positivo) en el proceso padre.",
      "La variable 'pid' toma el valor 0 en el proceso padre, y el PID del padre en el proceso hijo."
    ],
    "ans": 0,
    "ex": "fork() devuelve 0 al nuevo proceso creado (hijo) y el identificador de proceso (PID) del hijo al proceso padre, permitiendo a este último identificar y controlar a su descendiente."
  },
  {
    "id": "hy_t2_6",
    "t": "T2",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "¿Qué sucede con un proceso hijo en Unix que termina su ejecución pero cuyo proceso padre aún no ha llamado a wait() o waitpid() para recoger su estado?",
    "opts": [
      "El proceso hijo se destruye y desaparece inmediatamente de la tabla de procesos del núcleo.",
      "El proceso hijo permanece en estado 'zombi' (defunct), reteniendo su entrada en la tabla de procesos y su código de salida hasta que el padre invoque wait()."
    ],
    "ans": 1,
    "ex": "Un proceso en estado zombi ha liberado su memoria y recursos, pero conserva su entrada en la tabla de procesos del kernel (BCP) para que el padre pueda leer el estado de terminación mediante wait(). Si el padre muere sin recogerlo, el proceso init/systemd lo adopta y lo limpia."
  },
  {
    "id": "hy_t2_7",
    "t": "T2",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "En un sistema con planificación por Colas Multinivel con Retroalimentación (MLFQ):",
    "opts": [
      "Los procesos intensivos en CPU que agotan su quantum completo descienden a colas de menor prioridad con quantums progresivamente mayores.",
      "Todos los procesos nuevos se insertan directamente en la cola de menor prioridad para proteger la interactividad del sistema."
    ],
    "ans": 0,
    "ex": "MLFQ penaliza a los procesos que consumen mucho tiempo de CPU bajándolos de prioridad para favorecer a los procesos interactivos/limitados por E/S. En las colas inferiores el quantum suele ser más grande para reducir la sobrecarga de conmutación de procesos largos."
  },
  {
    "id": "hy_t2_8",
    "t": "T2",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "En el cálculo de métricas de planificación de CPU, la definición del tiempo de espera (Te) de un proceso es:",
    "opts": [
      "El tiempo total transcurrido desde que el proceso llega al sistema hasta que finaliza completamente.",
      "El tiempo total que el proceso ha permanecido en la cola de listos esperando a que se le conceda la CPU."
    ],
    "ans": 1,
    "ex": "El tiempo de espera (Te) es exclusivamente el tiempo que el proceso ha estado en estado 'Listo' esperando CPU. El tiempo total desde la llegada hasta el final es el tiempo de retorno (Tr = Te + tiempo de ejecución + esperas de E/S)."
  },
  {
    "id": "hy_t3_1",
    "t": "T3",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "Un usuario ejecuta 'ls -la' sobre un directorio y observa los siguientes permisos en un fichero: '-r--rw-r-- 1 profesor alumnos 1024 examen.txt'. Si el usuario 'profesor' (UID del propietario) intenta abrir el archivo en modo escritura (w):",
    "opts": [
      "Tendrá acceso de escritura concedido porque el grupo al que pertenece tiene permisos 'rw-'.",
      "Tendrá acceso de escritura DENEGADO porque el algoritmo de comprobación comprueba primero si el UID coincide con el propietario; al coincidir, aplica solo 'r--' y finaliza la comprobación."
    ],
    "ans": 1,
    "ex": "En Unix la comprobación de permisos es estricta y excluyente: si el UID del proceso coincide con el propietario del fichero, se evalúan ÚNICAMENTE los 3 bits del propietario ('r--') y se ignora el grupo y otros. Dado que el propietario no tiene 'w', la apertura en modo escritura falla con 'Permiso denegado'."
  },
  {
    "id": "hy_t3_2",
    "t": "T3",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "Para que un usuario pueda borrar un fichero denominado 'notas.txt' ubicado en el directorio '/datos/parcial':",
    "opts": [
      "Es estrictamente necesario que el usuario tenga permiso de escritura ('w') sobre el propio fichero 'notas.txt'.",
      "Es necesario que el usuario tenga permiso de escritura ('w') y ejecución ('x') sobre el directorio '/datos/parcial', siendo irrelevantes los permisos del propio fichero 'notas.txt'."
    ],
    "ans": 1,
    "ex": "Borrar un fichero consiste en eliminar una entrada de la tabla de directorios padre. Por ello, solo se requiere permiso de escritura ('w') y paso ('x') sobre el DIRECTORIO que lo contiene. Un usuario puede borrar un fichero de solo lectura (r--) si tiene permiso 'w' en el directorio."
  },
  {
    "id": "hy_t3_3",
    "t": "T3",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "Si un usuario solo tiene permisos de ejecución ('--x') sobre un directorio, pero no de lectura ni escritura:",
    "opts": [
      "No puede listar el contenido del directorio con 'ls', pero sí puede acceder a un fichero de su interior si conoce su nombre exacto (por ejemplo 'cat dir/f.txt').",
      "No puede acceder de ninguna forma a los ficheros del interior del directorio."
    ],
    "ans": 0,
    "ex": "El permiso 'x' en un directorio permite atravesarlo (hacer cd) y resolver rutas hacia nodos-i interiores. Sin 'r' no puede leer el bloque de datos del directorio para listar nombres con ls, pero si conoce el nombre del archivo 'f.txt', el sistema resuelve su nodo-i con éxito."
  },
  {
    "id": "hy_t3_4",
    "t": "T3",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "En relación al almacenamiento de contraseñas en sistemas Linux modernos:",
    "opts": [
      "Las contraseñas hasheadas junto con su sal (salt) se almacenan en el fichero /etc/shadow, el cual solo es legible por el superusuario root.",
      "Las contraseñas hasheadas se almacenan en /etc/passwd con formato plano legible por cualquier usuario para permitir la autenticación distribuida."
    ],
    "ans": 0,
    "ex": "Históricamente se guardaban en /etc/passwd, pero al ser legible por todos los usuarios para resolver nombres de usuario y UID, permitía ataques de fuerza bruta offline. Por seguridad, los hashes con sal se trasladaron a /etc/shadow, accesible exclusivamente por root."
  },
  {
    "id": "hy_t3_5",
    "t": "T3",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "En una matriz de acceso de protección, la representación mediante Listas de Posibilidades o Capacidades (C-Lists):",
    "opts": [
      "Almacena la información por columnas, asociando a cada objeto la lista de dominios que pueden acceder a él.",
      "Almacena la información por filas, asociando a cada dominio o sujeto una lista de los objetos sobre los que posee derechos y las operaciones permitidas."
    ],
    "ans": 1,
    "ex": "Las capacidades representan las filas de la matriz de acceso (sujeto/dominio -> conjunto de objetos y derechos). Las ACLs representan las columnas (objeto -> dominios y derechos)."
  },
  {
    "id": "hy_t3_6",
    "t": "T3",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "El bit 'Sticky bit' (t) aplicado sobre un directorio compartido (como /tmp) tiene la función de:",
    "opts": [
      "Hacer que todos los ficheros creados en su interior hereden automáticamente el grupo propietario del directorio.",
      "Impedir que un usuario pueda borrar o renombrar ficheros que pertenezcan a otros usuarios, aun cuando el usuario tenga permisos de escritura ('w') en el directorio."
    ],
    "ans": 1,
    "ex": "En directorios públicos con permiso de escritura general (1777 como /tmp), el sticky bit restringe el borrado: solo el propietario del fichero o root pueden borrarlo o renombrarlo, evitando que usuarios maliciosos borren el trabajo de los demás."
  },
  {
    "id": "hy_t4_1",
    "t": "T4",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "En un sistema de ficheros basado en nodos-i con bloques de 4 KiB y direcciones de bloque de disco de 4 bytes, ¿cuántos bloques de datos puede direccionar como máximo un Bloque Simple Indirecto (BSI)?",
    "opts": [
      "1.024 bloques (4 MiB).",
      "256 bloques (1 MiB)."
    ],
    "ans": 0,
    "ex": "En un bloque de 4 KiB (4096 bytes) con direcciones de 4 bytes caben: 4096 / 4 = 1.024 punteros a disco. Dado que cada puntero referencia un bloque de 4 KiB, el BSI puede direccionar hasta 1.024 × 4 KiB = 4.096 KiB = 4 MiB de datos."
  },
  {
    "id": "hy_t4_2",
    "t": "T4",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "En un sistema con nodos-i de 10 punteros directos, 1 BSI, 1 BDI y 1 BTI, con bloques de 1 KiB y punteros de 4 bytes (256 punteros por bloque indirecto), ¿en qué nivel de indirección se encuentra el byte situado en la posición 300.000?",
    "opts": [
      "En la zona direccionada por el Bloque Doble Indirecto (BDI).",
      "En la zona direccionada por el Bloque Simple Indirecto (BSI)."
    ],
    "ans": 0,
    "ex": "Número de bloque lógico: NL = floor(300.000 / 1024) = 292. Punteros directos cubren bloques 0 a 9 (10 bloques). El BSI cubre los siguientes 256 bloques (bloques 10 a 265). Como NL = 292 > 265, cae obligatoriamente en el Bloque Doble Indirecto (BDI)."
  },
  {
    "id": "hy_t4_3",
    "t": "T4",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "Respecto a los enlaces duros ('hard links') y enlaces simbólicos ('soft links') en sistemas Unix:",
    "opts": [
      "Un enlace duro crea un nuevo nodo-i independiente con una copia exacta de los metadatos del fichero original.",
      "Un enlace duro crea una nueva entrada en un directorio que apunta al mismo número de nodo-i que el fichero original, incrementando su contador de referencias (nlink)."
    ],
    "ans": 1,
    "ex": "Los hard links comparten el mismo nodo-i (mismos datos y metadatos) e incrementan el campo nlink del nodo-i. No pueden cruzar particiones ni crearse sobre directorios. Los soft links sí tienen su propio nodo-i independiente cuyo contenido es la ruta al destino."
  },
  {
    "id": "hy_t4_4",
    "t": "T4",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "En un sistema de asignación de ficheros mediante lista ligada sin índice, si un fichero ocupa 50 bloques de 2 KiB cada uno, ¿cuántos accesos a disco se requieren para leer el byte 45.000?",
    "opts": [
      "22 lecturas de disco.",
      "1 única lectura directa de disco."
    ],
    "ans": 0,
    "ex": "El byte 45.000 cae en el bloque floor(45000 / 2044) o bloque 21 (recordando que los punteros al final restan espacio útil). Como la lista no tiene índice en memoria, para llegar al bloque 21 hay que leer secuencialmente desde el bloque 0 hasta el 21 = 22 lecturas de disco."
  },
  {
    "id": "hy_t4_5",
    "t": "T4",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "En la tabla de asignación de ficheros (FAT) utilizada en MS-DOS / FAT32:",
    "opts": [
      "La tabla entera de punteros se carga en memoria RAM, lo que permite seguir la cadena de bloques para acceso aleatorio sin realizar operaciones de disco intermedias.",
      "Cada bloque de datos de disco almacena al final del bloque el puntero hacia el siguiente bloque de datos."
    ],
    "ans": 0,
    "ex": "La innovación de la FAT frente a las listas ligadas clásicas es extraer los punteros de los bloques de datos y colocarlos en una tabla centralizada que se mantiene en memoria principal (RAM), acelerando enormemente la resolución de bloques."
  },
  {
    "id": "hy_t4_6",
    "t": "T4",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "En Unix, al ejecutar 'cat /etc/hosts', suponiendo que solo el nodo-i del directorio raíz '/' está cargado en la caché de memoria y que cada directorio ocupa exactamente un bloque de disco, ¿cuántos accesos a disco son necesarios para leer los datos de '/etc/hosts'?",
    "opts": [
      "4 accesos a disco.",
      "7 accesos a disco."
    ],
    "ans": 0,
    "ex": "Desglose paso a paso: 1) Leer bloque de datos de '/' (1 acceso) para buscar 'etc'; 2) Leer nodo-i de 'etc' (1 acceso); 3) Leer bloque de datos de 'etc' (1 acceso) para buscar 'hosts'; 4) Leer nodo-i de 'hosts' (1 acceso); 5) Leer bloque de datos de 'hosts' (1 acceso). Total = 5 accesos (o 4 para llegar a su nodo-i). Si la pregunta es leer datos: 5 accesos."
  },
  {
    "id": "hy_t1_5",
    "t": "T1",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "Respecto a los eventos que transfieren el control al sistema operativo, ¿cuál de las siguientes opciones describe una excepción?",
    "opts": [
      "Un evento software síncrono producido por la propia CPU al ejecutar una instrucción errónea o especial, como una división por cero o un fallo de página.",
      "Una señal eléctrica asíncrona enviada por un controlador de dispositivo externo, como la llegada de un paquete de red o una pulsación de teclado."
    ],
    "ans": 0,
    "ex": "Las excepciones son eventos síncronos provocados directamente por la ejecución de la instrucción en curso (división por cero, fallo de segmento, fallo de página). Las interrupciones son asíncronas respecto a las instrucciones y proceden de dispositivos hardware externos (reloj, red, disco)."
  },
  {
    "id": "hy_t1_6",
    "t": "T1",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "En el mecanismo de buffering en memoria principal, su principal propósito es:",
    "opts": [
      "Permitir el solapamiento del cómputo de un programa con sus propias operaciones de entrada/salida.",
      "Permitir que múltiples programas compartan de forma obligatoria el mismo archivo físico en disco simultáneamente."
    ],
    "ans": 0,
    "ex": "Los buffers son áreas de memoria RAM donde se depositan datos de E/S. Mientras el controlador de dispositivo transfiere datos al buffer de forma autónoma (mediante DMA o interrupciones), el proceso continúa calculando en CPU, solapando cómputo y E/S del mismo programa."
  },
  {
    "id": "hy_t2_9",
    "t": "T2",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "Para evitar que los procesos con menor prioridad sufran de inanición (starvation) indefinida en un sistema con prioridades:",
    "opts": [
      "Se aplica la técnica de envejecimiento (aging), incrementando gradualmente la prioridad efectiva de un proceso a medida que pasa más tiempo esperando en la cola de listos.",
      "Se deshabilitan las interrupciones del temporizador cuando entra un proceso de baja prioridad."
    ],
    "ans": 0,
    "ex": "El envejecimiento (aging) consiste en aumentar progresivamente la prioridad de los procesos que llevan mucho tiempo en la cola de listos. Con el tiempo, su prioridad acumulada supera a la de los procesos recién llegados, garantizando que finalmente obtendrán la CPU."
  },
  {
    "id": "hy_t2_10",
    "t": "T2",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "Un proceso realiza un cálculo intensivo en CPU durante 10 unidades de tiempo y luego solicita 5 unidades de E/S de disco. Decimos que este proceso es:",
    "opts": [
      "Un proceso limitado por la CPU (CPU-bound).",
      "Un proceso limitado por la entrada/salida (I/O-bound)."
    ],
    "ans": 0,
    "ex": "Los procesos CPU-bound pasan la inmensa mayoría de su tiempo realizando cómputo en la CPU con ráfagas de CPU largas y ráfagas de E/S infrecuentes. Los procesos I/O-bound tienen ráfagas de CPU muy breves seguidas de esperas frecuentes de periféricos."
  },
  {
    "id": "hy_t3_7",
    "t": "T3",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "En Unix, si un fichero tiene permisos en notación octal '754', los permisos correspondientes para el propietario, el grupo y el resto de usuarios son respectivamente:",
    "opts": [
      "Propietario: rwx (7) · Grupo: r-x (5) · Otros: r-- (4)",
      "Propietario: rwx (7) · Grupo: rw- (5) · Otros: -wx (4)"
    ],
    "ans": 0,
    "ex": "En binario: 7 = 111 (rwx); 5 = 101 (r-x); 4 = 100 (r--). Por tanto 754 otorga todos los permisos al propietario, lectura y ejecución al grupo, y solo lectura a los demás usuarios."
  },
  {
    "id": "hy_t3_8",
    "t": "T3",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "El bit SETGID (g+s) configurado sobre un DIRECTORIO en Unix produce el siguiente efecto:",
    "opts": [
      "Cualquier fichero nuevo que se cree dentro del directorio hereda automáticamente el grupo propietario del directorio en vez del grupo principal del usuario creador.",
      "Solo los usuarios que pertenezcan al grupo propietario del directorio pueden entrar en él."
    ],
    "ans": 0,
    "ex": "En directorios, el bit SETGID asegura que todos los subdirectorios y ficheros creados en su interior adopten el GID del directorio padre, facilitando enormemente el trabajo colaborativo entre miembros de un mismo grupo."
  },
  {
    "id": "hy_t4_7",
    "t": "T4",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "En un sistema con nodos-i de 10 punteros directos, 1 BSI y bloques de 1 KiB, si un fichero tiene un tamaño exacto de 12 KiB:",
    "opts": [
      "Ocupará en disco exactamente 12 bloques de datos más 1 bloque de metadatos (el BSI) = 13 bloques en total.",
      "Ocupará en disco exactamente 12 bloques de datos sin requerir ningún bloque adicional de metadatos."
    ],
    "ans": 0,
    "ex": "Los primeros 10 KiB ocupan los 10 punteros directos del nodo-i (que no requieren bloques extra en disco). Los 2 KiB restantes (2 bloques) se direccionan a través del BSI, el cual debe asignarse como un bloque de índice adicional en disco. Total = 12 de datos + 1 BSI = 13 bloques."
  },
  {
    "id": "hy_t4_8",
    "t": "T4",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "Con respecto a la fragmentación en los sistemas de ficheros con asignación indexada por nodos-i:",
    "opts": [
      "No sufren fragmentación externa, pero sí pueden presentar fragmentación interna en el último bloque asignado a cada fichero.",
      "Sufren tanto de severa fragmentación externa como de fragmentación interna en todos sus bloques."
    ],
    "ans": 0,
    "ex": "Al poder asignarse cualquier bloque libre en cualquier parte del disco, nunca hay fragmentación externa. La fragmentación interna se produce únicamente en el último bloque del fichero si su tamaño no es múltiplo exacto del tamaño de bloque."
  },
  {
    "id": "hy_t4_9",
    "t": "T4",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "En la gestión de la caché de disco (buffer cache) del sistema operativo, la política 'write-back' (escritura diferida) se caracteriza por:",
    "opts": [
      "Marcar los bloques modificados en memoria como 'sucios' (dirty) y retrasar su volcado a disco, mejorando el rendimiento a costa de riesgo de pérdida de datos ante un corte brusco de energía.",
      "Escribir inmediatamente en disco cada byte que una aplicación escribe en el buffer, garantizando consistencia absoluta pero reduciendo drásticamente la velocidad de escritura."
    ],
    "ans": 0,
    "ex": "Write-back acumula escrituras en RAM y las vuelca periódicamente (por ej. cada 30 segundos mediante el demonio sync/pdflush), reduciendo accesos a disco. Write-through es la que escribe inmediatamente a disco."
  },
  {
    "id": "hy_t4_10",
    "t": "T4",
    "source": "Generador Examen ISO (Parcial 1)",
    "q": "¿Qué contiene físicamente una entrada en la estructura de un directorio Unix tradicional?",
    "opts": [
      "Únicamente el nombre del fichero y el número de nodo-i correspondiente.",
      "El nombre del fichero, sus permisos, su tamaño en bytes y la lista completa de direcciones de bloques en disco."
    ],
    "ans": 0,
    "ex": "En Unix, los atributos, permisos, tamaños y punteros a bloques residen exclusivamente en el NODO-I. La entrada de directorio es simplemente una tabla que asocia un nombre de archivo con su número de nodo-i (inumber)."
  },
  {
    "id": "examen_noviembre_2023_2",
    "t": "T2",
    "q": "En el mecanismo de multitarea:",
    "opts": [
      "Es necesario que el planificador de procesos sea apropiativo de cara a poder ir pasando el uso de la CPU de un proceso a otro.",
      "Un proceso puede utilizar la CPU todo el tiempo que precise de manera consecutiva, sin cederla, independientemente de la cantidad y de la prioridad de los procesos que estén esperando en la cola de listos."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q2)",
    "explanation": "Solución oficial (A): Es necesario que el planificador de procesos sea apropiativo de cara a poder ir pasando el uso de la CPU de un proceso a otro."
  },
  {
    "id": "examen_noviembre_2023_3",
    "t": "T2",
    "q": "En los sistemas operativos distribuidos:",
    "opts": [
      "Se suele proporcionar tolerancia a fallos de una máquina, asumiendo otra máquina del sistema su labor de forma transparente al usuario.",
      "El usuario es el encargado de decidir en qué máquina del sistiema distribuido se ejecutarán sus procesos."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q3)",
    "explanation": "Solución oficial (A): Se suele proporcionar tolerancia a fallos de una máquina, asumiendo otra máquina del sistema su labor de forma transparente al usuario."
  },
  {
    "id": "examen_noviembre_2023_4",
    "t": "T2",
    "q": "El mecanismo de interrupciones periódicas:",
    "opts": [
      "Permite evitar que un proceso de usuario que no hace llamadas al sistema monopolice la CPU.",
      "Se encarga de atender las interrupciones que se producen periódicamente en los dispositivos de E/S, como puede ser el disco duro cuando se le solicita que lea una secuencia de bloques."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q4)",
    "explanation": "Solución oficial (A): Permite evitar que un proceso de usuario que no hace llamadas al sistema monopolice la CPU."
  },
  {
    "id": "examen_noviembre_2023_5",
    "t": "T2",
    "q": "Un sistema operativo basado en el modelo cliente-servidor (microkernel):",
    "opts": [
      "Implementa los servicios que acceden directamente al hardware como procesos en modo usuario, de manera que si un servicio falla, no corrompe el núcleo.",
      "Permite la posibilidad de que un proceso cliente pueda solicitar servicios a un proceso servidor sin que ambos tengan que estar ejecutándose en la misma máquina fı́sica."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q5)",
    "explanation": "Solución oficial (B): Permite la posibilidad de que un proceso cliente pueda solicitar servicios a un proceso servidor sin que ambos tengan que estar ejecutándose en la misma máquina fı́sica."
  },
  {
    "id": "examen_noviembre_2023_6",
    "t": "T2",
    "q": "En una CPU con más de un núcleo:",
    "opts": [
      "La planificación de la CPU puede provocar que un proceso vaya ejecutándose en diferentes núcleos durante su vida.",
      "Si asignamos dos hilos de un mismo proceso a dos núcleos diferentes, conseguimos que se ejecuten de forma aislada sin compartir recursos entre ellos."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q6)",
    "explanation": "Solución oficial (A): La planificación de la CPU puede provocar que un proceso vaya ejecutándose en diferentes núcleos durante su vida."
  },
  {
    "id": "examen_noviembre_2023_7",
    "t": "T2",
    "q": "En relación con la ejecución de procesos, el pseudoparalelismo:",
    "opts": [
      "Sigue estando presente aunque la CPU tenga varios núcleos que permiten paralelismo real.",
      "Es otra forma de llamar al paralelismo que usa hilos en modo usuario."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q7)",
    "explanation": "Solución oficial (A): Sigue estando presente aunque la CPU tenga varios núcleos que permiten paralelismo real."
  },
  {
    "id": "examen_noviembre_2023_8",
    "t": "T2",
    "q": "Durante la codificación de un programa:",
    "opts": [
      "Lo habitual es que en nuestro código tengamos en cuenta que hay muchos procesos eje- cutándose en paralelo junto con el nuestro.",
      "No podemos presuponer con exactitud el tiempo que tardará en ejecutarse cualquier parte del código."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q8)",
    "explanation": "Solución oficial (B): No podemos presuponer con exactitud el tiempo que tardará en ejecutarse cualquier parte del código."
  },
  {
    "id": "examen_noviembre_2023_9",
    "t": "T2",
    "q": "En un sistema Unix, tenemos un proceso P ejecutándose en modo usuario que realiza una llamada al sistema. Durante la ejecución del código de dicha llamada, el proceso P se bloquea, pasándose a ejecutar el proceso Q en modo núcleo que, tras un cierto tiempo, pasa a modo usuario. En todo este transcurso:",
    "opts": [
      "Se han producido 2 cambios de modo, 1 cambio de proceso y 3 cambios de contexto.",
      "Se han producido 3 cambios de modo, 2 cambios de proceso y 1 cambio de contexto."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q9)",
    "explanation": "Solución oficial (A): Se han producido 2 cambios de modo, 1 cambio de proceso y 3 cambios de contexto."
  },
  {
    "id": "examen_noviembre_2023_10",
    "t": "T2",
    "q": "En un sistema Unix, la realización de una llamada al sistema fork() por parte de un proceso P:",
    "opts": [
      "Provoca la creación de un nuevo proceso Q independiente que se ejecuta siempre y cuando P esté vivo. Si P muere, también muere Q.",
      "Crea un nuevo proceso Q que contendrá esencialmente el mismo código y datos que P, por lo que habrá que tener presente en el código la forma de hacer que cada proceso se encargue de la labor que le corresponde."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q10)",
    "explanation": "Solución oficial (B): Crea un nuevo proceso Q que contendrá esencialmente el mismo código y datos que P, por lo que habrá que tener presente en el código la forma de hacer que cada proceso se encargue de la labor que le corresponde."
  },
  {
    "id": "examen_noviembre_2023_11",
    "t": "T2",
    "q": "En relación con los cambios de estado de un proceso:",
    "opts": [
      "Un proceso en el estado Listo solo puede pasar al estado Bloqueado si pasa previamente por el estado de Ejecución.",
      "El número de procesos en estado Ejecución depende del tipo de planificador, no del número de núcleos que tenga nuestra CPU."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q11)",
    "explanation": "Solución oficial (A): Un proceso en el estado Listo solo puede pasar al estado Bloqueado si pasa previamente por el estado de Ejecución."
  },
  {
    "id": "examen_noviembre_2023_12",
    "t": "T2",
    "q": "Tenemos únicamente 3 procesos en nuestra máquina: P, Q y R. En el momento t, P está Bloqueado, Q en Ejecución y R en estado Listo. Entonces, los estados de estos procesos en el instante t + 1 podrı́an ser:",
    "opts": [
      "P:Listo, Q:Bloqueado, R:Listo.",
      "P:Listo, Q:Bloqueado, R:Ejecución."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q12)",
    "explanation": "Solución oficial (B): P:Listo, Q:Bloqueado, R:Ejecución."
  },
  {
    "id": "examen_noviembre_2023_13",
    "t": "T2",
    "q": "En Unix, cuando un proceso crea un nuevo proceso hijo:",
    "opts": [
      "El BCP del proceso hijo es una copia idéntica del BCP del proceso padre.",
      "Ambos procesos compartirán el mismo segmento de código."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q13)",
    "explanation": "Solución oficial (B): Ambos procesos compartirán el mismo segmento de código."
  },
  {
    "id": "examen_noviembre_2023_14",
    "t": "T2",
    "q": "Tenemos una CPU con 2 núcleos y un sistema operativo sin soporte para hilos. Si un proceso con 2 hilos quiere utilizar ambos núcleos de la CPU:",
    "opts": [
      "No será posible, y ambos hilos tendrán que ejecutarse necesariamente en un mismo núcleo.",
      "No tendrá que hacer nada especial porque el SO se encarga de asignar cada hilo a un núcleo diferente."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q14)",
    "explanation": "Solución oficial (A): No será posible, y ambos hilos tendrán que ejecutarse necesariamente en un mismo núcleo."
  },
  {
    "id": "examen_noviembre_2023_15",
    "t": "T2",
    "q": "Si el sistema operativo tiene implementados el soporte para hilos dentro del núcleo:",
    "opts": [
      "Cada uno de los hilos se podrá bloquear de forma independiente.",
      "Cada proceso puede tener un planificador que se adapte a los requerimientos de sus hilos."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q15)",
    "explanation": "Solución oficial (A): Cada uno de los hilos se podrá bloquear de forma independiente."
  },
  {
    "id": "examen_noviembre_2023_16",
    "t": "T2",
    "q": "En relación con la planificación de procesos, teniendo en cuenta la meta de equidad:",
    "opts": [
      "El planificador intenta conseguir que el tiempo de CPU que reciben todos los procesos sea aproximadamente el mismo.",
      "El planificador asignará a cada proceso más o menos tiempo de CPU en función de las caracterı́sticas del propio proceso."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q16)",
    "explanation": "Solución oficial (B): El planificador asignará a cada proceso más o menos tiempo de CPU en función de las caracterı́sticas del propio proceso."
  },
  {
    "id": "examen_noviembre_2023_17",
    "t": "T2",
    "q": "En relación a la planificación de procesos, el tiempo de espera de un proceso es:",
    "opts": [
      "El tiempo que pasa un proceso en el estado Bloqueado.",
      "El tiempo que pasa un proceso en el estado Listo."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q17)",
    "explanation": "Solución oficial (B): El tiempo que pasa un proceso en el estado Listo."
  },
  {
    "id": "examen_noviembre_2023_18",
    "t": "T2",
    "q": "En relación con la planificación de procesos:",
    "opts": [
      "Un proceso se dice que está limitado por CPU cuando necesita más núcleos de CPU para ejecutarse de los que ofrece la CPU.",
      "Un proceso limitado por CPU tendrá normalmente muchas ráfagas largas de CPU."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q18)",
    "explanation": "Solución oficial (B): Un proceso limitado por CPU tendrá normalmente muchas ráfagas largas de CPU."
  },
  {
    "id": "examen_noviembre_2023_19",
    "t": "T2",
    "q": "Utilizando el algoritmo de planificación de procesos FCFS:",
    "opts": [
      "Se puede producir un efecto convoy que perjudica a los procesos limitados por E/S.",
      "Minimizamos el tiempo de respuesta de los procesos."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q19)",
    "explanation": "Solución oficial (A): Se puede producir un efecto convoy que perjudica a los procesos limitados por E/S."
  },
  {
    "id": "examen_noviembre_2023_20",
    "t": "T2",
    "q": "En un planificador Round-Robin:",
    "opts": [
      "Tenemos que definir un mecanismo adicional para evitar que haya procesos que jamás cojan la CPU.",
      "El tiempo que tarda un proceso en coger la CPU está acotado."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q20)",
    "explanation": "Solución oficial (B): El tiempo que tarda un proceso en coger la CPU está acotado."
  },
  {
    "id": "examen_noviembre_2023_21",
    "t": "T2",
    "q": "En un planificador de múltiples colas con realimentación, se cumple que:",
    "opts": [
      "Un proceso de una cierta cola, tras ejecutarse y bloquearse, puede desbloquearse en una cola diferente.",
      "Todos los procesos se ejecutan una cantidad de tiempo proporcional a la prioridad de su cola."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q21)",
    "explanation": "Solución oficial (A): Un proceso de una cierta cola, tras ejecutarse y bloquearse, puede desbloquearse en una cola diferente."
  },
  {
    "id": "examen_noviembre_2023_22",
    "t": "T2",
    "q": "Usando un planificador de procesos SRTF:",
    "opts": [
      "El proceso en ejecución no puede perder la CPU mientras no se bloquee y no entre ningún proceso en la cola de listos que no estuviera cuando se le asignó la CPU.",
      "Se consigue minimizar el tiempo que un proceso se encuentra bloqueado."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q22)",
    "explanation": "Solución oficial (A): El proceso en ejecución no puede perder la CPU mientras no se bloquee y no entre ningún proceso en la cola de listos que no estuviera cuando se le asignó la CPU."
  },
  {
    "id": "examen_noviembre_2023_23",
    "t": "T1",
    "q": "Si un usuario no autorizado modifica maliciosamente el software de acceso a una base de datos provocando que ningún usuario pueda acceder a una parte de la información almacenada:",
    "opts": [
      "Se vulnera el requisito de integridad del software y el de disponibilidad de los datos.",
      "Se vulnera el requisito de integridad de los datos y el de disponibilidad del software."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q23)",
    "explanation": "Solución oficial (A): Se vulnera el requisito de integridad del software y el de disponibilidad de los datos."
  },
  {
    "id": "examen_noviembre_2023_24",
    "t": "T1",
    "q": "La polı́tica de seguridad de un sistema:",
    "opts": [
      "Es la encargada de implementar los mecanismos de seguridad del sistema.",
      "Es independiente de los mecanismos de seguridad del sistema, siempre que dichos meca- nismos sean suficientemente generales."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q24)",
    "explanation": "Solución oficial (B): Es independiente de los mecanismos de seguridad del sistema, siempre que dichos meca- nismos sean suficientemente generales."
  },
  {
    "id": "examen_noviembre_2023_25",
    "t": "T1",
    "q": "En un dominio de protección:",
    "opts": [
      "Hay una entrada por cada usuario del sistema en la que se indica qué operaciones puede realizar dicho usuario sobre los diferentes objetos del sistema.",
      "Hay un conjunto de entradas que asocian objetos del sistema con las operaciones que se pueden realizar sobre dicho objeto."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q25)",
    "explanation": "Solución oficial (B): Hay un conjunto de entradas que asocian objetos del sistema con las operaciones que se pueden realizar sobre dicho objeto."
  },
  {
    "id": "examen_noviembre_2023_26",
    "t": "T2",
    "q": "Un problema que aparece al implementar listas de posibilidades es:",
    "opts": [
      "que solamente existe la lista de posibilidades de un proceso mientras se está ejecutando, por lo que se necesita una forma de preservar los permisos cuando el ordenador se apaga.",
      "que no es factible que un proceso ceda una posibilidad a otro proceso, cuando esto es una práctica común entre un proceso y sus hijos."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q26)",
    "explanation": "Solución oficial (A): que solamente existe la lista de posibilidades de un proceso mientras se está ejecutando, por lo que se necesita una forma de preservar los permisos cuando el ordenador se apaga."
  },
  {
    "id": "examen_noviembre_2023_27",
    "t": "T4",
    "q": "Cuando un usuario U intenta conectarse a un sistema Unix y proporciona una contraseña P:",
    "opts": [
      "El sistema operativo tiene un fichero encriptado donde se almacenan las contraseñas de manera que no sean accesibles por extraños.",
      "El sistema operativo debe buscar en el fichero apropiado el tipo de encriptación y la base que tiene almacenados para U."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q27)",
    "explanation": "Solución oficial (B): El sistema operativo debe buscar en el fichero apropiado el tipo de encriptación y la base que tiene almacenados para U."
  },
  {
    "id": "examen_noviembre_2023_28",
    "t": "T1",
    "q": "En relación con la gestión de contraseñas en Unix, si dos usuarios cambian sus contraseñas y casual- mente deciden utilizar la misma:",
    "opts": [
      "Sus contraseñas cifradas serán distintas porque lo que se encripta es la concatenación de la contraseña y el UID, que es diferente para cada usuario del sistema.",
      "Sus contraseñas cifradas serán distintas porque lo que se encripta es la concatenación de la contraseña y un valor aleatorio denominado base."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q28)",
    "explanation": "Solución oficial (B): Sus contraseñas cifradas serán distintas porque lo que se encripta es la concatenación de la contraseña y un valor aleatorio denominado base."
  },
  {
    "id": "examen_noviembre_2023_29",
    "t": "T4",
    "q": "En un sistema Unix tenemos un fichero llamado anotaciones.txt, con permisos rw- r-- ---, cuyo usuario propietario es pepe y cuyo grupo propietario es empleados. Tenemos también otro usuario, llamado U (el UID de U es distinto del UID de pepe), que pertenece a los grupos pepe, X y Z. El usuario U lanza un proceso P, por lo que:",
    "opts": [
      "Si el GID de alguno de los grupos pepe, X o Z es igual al GID de empleados entonces P podrá leer anotaciones.txt.",
      "Si el GID de pepe es igual al GID de empleados entonces P podrá modificar anotaciones.txt."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q29)",
    "explanation": "Solución oficial (A): Si el GID de alguno de los grupos pepe, X o Z es igual al GID de empleados entonces P podrá leer anotaciones.txt."
  },
  {
    "id": "examen_noviembre_2023_30",
    "t": "T4",
    "q": "En un sistema Unix tenemos el fichero anotaciones.txt, con permisos rws --- --x, cuyo usuario propietario es pepe y cuyo grupo propietario es empleados. El usuario U lanza un proceso P. Entonces:",
    "opts": [
      "P podrá leer anotaciones.txt solamente si se cumple que el UID de U es igual al UID de pepe.",
      "P podrá leer anotaciones.txt gracias al bit SETUID de este fichero, que hará que tem- poralmente tome el papel de root que puede acceder a cualquier fichero."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q30)",
    "explanation": "Solución oficial (A): P podrá leer anotaciones.txt solamente si se cumple que el UID de U es igual al UID de pepe."
  },
  {
    "id": "examen_noviembre_2023_31",
    "t": "T4",
    "q": "Los ficheros especiales de caracteres:",
    "opts": [
      "Constan de lı́neas de texto que se pueden ver y modificar tal cual en un editor de texto común y solo pueden accederse secuencialmente.",
      "Están asociados a ciertos dispositivos de E/S."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q31)",
    "explanation": "Solución oficial (B): Están asociados a ciertos dispositivos de E/S."
  },
  {
    "id": "examen_noviembre_2023_32",
    "t": "T4",
    "q": "En relación con los ficheros en Unix:",
    "opts": [
      "Las tuberı́as son ficheros especiales que por un extremo se escriben byte a byte, secuen- cialmente, pero por el otro se puede acceder a cualquier byte almacenado en dicha tuberı́a.",
      "El tamaño de un fichero en Unix se almacena en su nodo-i."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q32)",
    "explanation": "Solución oficial (B): El tamaño de un fichero en Unix se almacena en su nodo-i."
  },
  {
    "id": "examen_noviembre_2023_33",
    "t": "T4",
    "q": "En relación con los directorios en Unix:",
    "opts": [
      "La llamada al sistema writedir permite modificar entradas de un directorio.",
      "La llamada al sistema unlink puede, bajo ciertas circunstancias, modificar el contenido del nodo-i correspondiente al fichero que recibe como parámetro sin eliminarlo."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q33)",
    "explanation": "Solución oficial (B): La llamada al sistema unlink puede, bajo ciertas circunstancias, modificar el contenido del nodo-i correspondiente al fichero que recibe como parámetro sin eliminarlo."
  },
  {
    "id": "examen_noviembre_2023_34",
    "t": "T4",
    "q": "Con respecto a los enlaces y las rutas en Unix:",
    "opts": [
      "Un enlace simbólico siempre contiene la ruta absoluta al fichero enlazado, de esa manera aunque movamos el enlace, sigue funcionando.",
      "Un enlace simbólico contiene la ruta exacta usada para crear el enlace, de esa manera, si movemos el enlace y lo hemos creado con una ruta relativa, puede dejar de funcionar."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q34)",
    "explanation": "Solución oficial (B): Un enlace simbólico contiene la ruta exacta usada para crear el enlace, de esa manera, si movemos el enlace y lo hemos creado con una ruta relativa, puede dejar de funcionar."
  },
  {
    "id": "examen_noviembre_2023_35",
    "t": "T4",
    "q": "En la implementación de un Sistema de Ficheros por parte del Sistema Operativo:",
    "opts": [
      "El dispositivo de almacenamiento secundario se gestiona como un array lineal de bloques.",
      "Por cada fichero F, el Sistema Operativo tiene almacenada tantas direcciones de disco como bytes tenga F con el objetivo de poder acceder a cualquiera de estos bytes de manera directa (acceso aleatorio)."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q35)",
    "explanation": "Solución oficial (A): El dispositivo de almacenamiento secundario se gestiona como un array lineal de bloques."
  },
  {
    "id": "examen_noviembre_2023_36",
    "t": "T4",
    "q": "Dado un sistema de ficheros implementado mediante asignación adyacente, si el bloque D (contando desde 0) de disco almacena el bloque X (contando desde 0) del fichero F, entonces:",
    "opts": [
      "El bloque (D − X) de disco seguro que almacena un bloque de F.",
      "El bloque (D + 1) de disco seguro que almacena un bloque de F."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q36)",
    "explanation": "Solución oficial (A): El bloque (D − X) de disco seguro que almacena un bloque de F."
  },
  {
    "id": "examen_noviembre_2023_37",
    "t": "T4",
    "q": "En una implementación de ficheros mediante asignación contigua en un disco con bloques de 4 KiB, para modificar el último byte de un fichero de 40 960 bytes:",
    "opts": [
      "Se tendrán que realizar dos operaciones con bloques de disco: 1 lectura y una escritura del bloque 9 del fichero.",
      "Se tendrá que realizar una única operación de escritura: un nuevo bloque al final del fichero (bloque 10) conteniendo el byte."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q37)",
    "explanation": "Solución oficial (A): Se tendrán que realizar dos operaciones con bloques de disco: 1 lectura y una escritura del bloque 9 del fichero."
  },
  {
    "id": "examen_noviembre_2023_38",
    "t": "T4",
    "q": "En una implementación de ficheros mediante lista ligada sin ı́ndice, con bloques de B bytes y direc- ciones de disco de d bytes, tenemos un fichero con T bytes. El número de lecturas de bloque que tenemos que realizar para leer el último bloque del fichero es:",
    "opts": [
      "⌈T /(B − d)⌉",
      "⌈(T − d)/B)⌉"
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q38)",
    "explanation": "Solución oficial (A): ⌈T /(B − d)⌉"
  },
  {
    "id": "examen_noviembre_2023_39",
    "t": "T4",
    "q": "Sean dos discos duros D1 y D2 idénticos formateados con un sistema de ficheros con asignación mediante lista ligada sin ı́ndice. D1 usa un tamaño de bloque B y D2 usa un tamaño de bloque 2 × B. Copiamos un mismo fichero F a ambos discos, por lo que en ambos está solamente ese fichero. Entonces:",
    "opts": [
      "La fragmentacion interna en ambos sistemas seguro que es la misma.",
      "La fragmentación externa en ambos sistemas seguro que es la misma."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q39)",
    "explanation": "Solución oficial (B): La fragmentación externa en ambos sistemas seguro que es la misma."
  },
  {
    "id": "examen_noviembre_2023_40",
    "t": "T4",
    "q": "Sean dos discos duros D1 y D2 idénticos. Formateamos D1 con un sistema de ficheros con asignación mediante lista ligada sin ı́ndice y D2 con un sistema de ficheros con asignación mediante lista ligada con ı́ndice. D1 usa un tamaño de bloque B y D2 usa un tamaño de bloque 2 × B. Si suponemos que en caso de D2 el ı́ndice se encuentra ya en memoria, entonces:",
    "opts": [
      "El número de accesos a disco que se necesitan en D1 para llegar al último bloque del fichero será la mitad de los que se necesitan en D2.",
      "El número de accesos a disco que se necesitan para llegar al último bloque del fichero en D2 es independiente del tamaño del bloque."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q40)",
    "explanation": "Solución oficial (B): El número de accesos a disco que se necesitan para llegar al último bloque del fichero en D2 es independiente del tamaño del bloque."
  },
  {
    "id": "examen_noviembre_2023_41",
    "t": "T4",
    "q": "En relación con los sistemas de ficheros, un nodo-i en un sistema de ficheros con estructura Unix tradicional:",
    "opts": [
      "Es un bloque de disco que contiene la lista de bloques de disco que componen un fichero.",
      "Tendrá un tamaño fijo, independiente del tamaño de los ficheros y del número total de ficheros existentes en el sistema de ficheros."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q41)",
    "explanation": "Solución oficial (B): Tendrá un tamaño fijo, independiente del tamaño de los ficheros y del número total de ficheros existentes en el sistema de ficheros."
  },
  {
    "id": "examen_noviembre_2023_42",
    "t": "T4",
    "q": "Tenemos un sistema de ficheros con bloques de 2 KiB, direcciones de bloque de 4 bytes y el nodo-i tiene una estructura Unix tradicional (10 punteros directos, 1 puntero a BSI, 1 puntero a BDI y 1 puntero a BTI). Entonces, para el fichero más grande que se podrı́a gestionar, se necesitarı́an:",
    "opts": [
      "263 171 bloques de metadatos.",
      "263 181 bloques de metadatos."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q42)",
    "explanation": "Solución oficial (A): 263 171 bloques de metadatos."
  },
  {
    "id": "examen_noviembre_2023_43",
    "t": "T4",
    "q": "Tenemos un sistema de ficheros Unix con bloques de 1 KiB, direcciones de bloque de 4 bytes y el nodo-i tiene una estructura tradicional (10 punteros directos, 1 puntero a BSI, 1 puntero a BDI y 1 puntero a BTI). Entonces, ¿cuántos bloques en total se necesitarı́an traer de disco a memoria principal para poder leer el byte X de un fichero, si suponemos que el nodo-i ya está en memoria principal?",
    "opts": [
      "Mı́nimo: 1 bloque. Máximo: 4 bloques.",
      "Mı́nimo: 1 bloques. Máximo: 66 052 bloques."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q43)",
    "explanation": "Solución oficial (A): Mı́nimo: 1 bloque. Máximo: 4 bloques."
  },
  {
    "id": "examen_noviembre_2023_44",
    "t": "T4",
    "q": "Tenemos la ruta /home/alumno, donde alumno es un enlace que acabamos de crear al directorio /externo/alumno donde hemos movido nuestro HOME para tener más espacio. Se sabe que: Solo están en memoria el nodo-i del directorio raı́z y el bloque de datos del directorio raı́z. Los ficheros y directorios tienen un solo bloque cada uno. Cada nodo-i se encuentra en un bloque diferente. Entonces, ¿cuántos bloques necesitaremos leer de disco para traer a memoria el primer bloque de datos del fichero /home/alumno/doc.txt?",
    "opts": [
      "10 si el enlace es simbólico.",
      "6 si el enlace es fı́sico."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q44)",
    "explanation": "Solución oficial (A): 10 si el enlace es simbólico."
  },
  {
    "id": "examen_noviembre_2023_45",
    "t": "T4",
    "q": "En cuanto a los tipos de enlaces en Unix, es cierto que . . .",
    "opts": [
      "Es posible crear un enlace simbólico a un fichero regular que se encuentra en un sistema de ficheros de un disco distinto de donde se creará el enlace.",
      "Es posible crear un enlace fı́sico a un fichero regular que se encuentra en un sistema de ficheros de un disco distinto de donde se creará el enlace."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q45)",
    "explanation": "Solución oficial (A): Es posible crear un enlace simbólico a un fichero regular que se encuentra en un sistema de ficheros de un disco distinto de donde se creará el enlace."
  },
  {
    "id": "examen_noviembre_2023_46",
    "t": "T4",
    "q": "En Unix, si creamos un fichero F y, a continuación, creamos 6 enlaces a dicho fichero F, de los que 4 son simbólicos y 2 son fı́sicos, ¿cuántos nodos-i se habrán creado en total?",
    "opts": [
      "3.",
      "5."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q46)",
    "explanation": "Solución oficial (B): 5."
  },
  {
    "id": "examen_noviembre_2023_47",
    "t": "T4",
    "q": "Con respecto a las diferencias entre los mapas de bits y las listas de bloques para llevar el control de los bloques libres de un disco, es cierto que:",
    "opts": [
      "El número de bloques que se necesitan para mantener un mapa de bits siempre es menor que el número de bloques que se necesitan para llevar la lista de bloques libres, debido a que almacenan mucho más eficientemente la información (solo necesitan un bit por bloque, mientras que la lista necesita un entero).",
      "Por mucho que ocupe una lista de bloques libres, en realidad no nos resta espacio de la zona de datos del disco, puesto que, conforme vamos consumiendo bloques, la lista también va desapareciendo."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q47)",
    "explanation": "Solución oficial (B): Por mucho que ocupe una lista de bloques libres, en realidad no nos resta espacio de la zona de datos del disco, puesto que, conforme vamos consumiendo bloques, la lista también va desapareciendo."
  },
  {
    "id": "examen_noviembre_2023_48",
    "t": "T4",
    "q": "En relación con el control de bloques libres en un sistema de ficheros con asignación mediante lista ligada con ı́ndice (FAT):",
    "opts": [
      "Cada entrada de la FAT podrı́a usarse para indicar que el bloque correspondiente está libre si almacenamos en ella un valor especial, que no sea un número de bloque válido, como forma de expresarlo.",
      "Necesitamos una estructura adicional, bien sea un mapa de bits o una lista de bloques para poder gestionar los bloques libres, como en cualquier otro sistema de ficheros."
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q48)",
    "explanation": "Solución oficial (A): Cada entrada de la FAT podrı́a usarse para indicar que el bloque correspondiente está libre si almacenamos en ella un valor especial, que no sea un número de bloque válido, como forma de expresarlo."
  },
  {
    "id": "examen_noviembre_2023_49",
    "t": "T4",
    "q": "La caché de disco:",
    "opts": [
      "Se utiliza para mantener el mayor tiempo posible en memoria principal algunos bloques de metadatos como los bloques doblemente indirectos, ya que estos bloques suelen tener muchas referencias en intervalos cortos de tiempo.",
      "Conlleva un control extra para forzar la escritura frecuente de bloques modificados que sean importantes para la consistencia del sistema de ficheros."
    ],
    "a": 1,
    "source": "Examen Noviembre 2023 (Q49)",
    "explanation": "Solución oficial (B): Conlleva un control extra para forzar la escritura frecuente de bloques modificados que sean importantes para la consistencia del sistema de ficheros."
  },
  {
    "id": "examen_noviembre_2023_50",
    "t": "T4",
    "q": "En un sistema de ficheros Unix tradicional:",
    "opts": [
      "El número de bloques de disco que se dedican al mapa de bits de nodos-i es habitualmente inferior al que se dedica al mapa de bits de bloques.",
      "La zona dedicada a nodos-i contiene, además de los propios nodos-i, los bloques BSI, BDI y BTI. Introducción a los Sistemas Operativos Examen de teorı́a: test (A). 24 de noviembre de 2023 Grupo: DNI: Apellidos: Nombre: Nº a b"
    ],
    "a": 0,
    "source": "Examen Noviembre 2023 (Q50)",
    "explanation": "Solución oficial (A): El número de bloques de disco que se dedican al mapa de bits de nodos-i es habitualmente inferior al que se dedica al mapa de bits de bloques."
  },
  {
    "id": "examen_noviembre_2022_2",
    "t": "T2",
    "q": "La caracterı́stica del hardware en la que se apoya directamente el sistema operativo para impedir que un proceso se quede con la CPU por tiempo indefinido es:",
    "opts": [
      "La disponibilidad de dos modos de funcionamiento (modo núcleo y modo usuario) en la CPU.",
      "Las interrupciones periódicas generadas por alguno de los relojes hardware con que debe contar el sistema."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q2)",
    "explanation": "Solución oficial (B): Las interrupciones periódicas generadas por alguno de los relojes hardware con que debe contar el sistema."
  },
  {
    "id": "examen_noviembre_2022_4",
    "t": "T2",
    "q": "Dados dos sistemas A y B, cuya única diferencia es que el sistema operativo de A implementa multi- programación y el de B multitarea, entonces el tiempo que necesitamos para completar la ejecución de un lote de 10 trabajos:",
    "opts": [
      "Va a ser mayor o igual en A que en B.",
      "Va a ser mayor o igual en B que en A."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q4)",
    "explanation": "Solución oficial (B): Va a ser mayor o igual en B que en A."
  },
  {
    "id": "examen_noviembre_2022_5",
    "t": "T1",
    "q": "Con respecto a la ejecución del intérprete de órdenes bash empleado en las prácticas:",
    "opts": [
      "Se realiza en modo usuario del procesador puesto que para el núcleo del sistema operativo su ejecución no difiere de la de cualquier otra aplicación de usuario.",
      "Se realiza en modo núcleo del procesador puesto que forma parte del núcleo del sistema operativo."
    ],
    "a": 0,
    "source": "Examen Noviembre 2022 (Q5)",
    "explanation": "Solución oficial (A): Se realiza en modo usuario del procesador puesto que para el núcleo del sistema operativo su ejecución no difiere de la de cualquier otra aplicación de usuario."
  },
  {
    "id": "examen_noviembre_2022_6",
    "t": "T2",
    "q": "En un sistema operativo basado en micronúcleo (organización cliente-servidor), es cierto que:",
    "opts": [
      "Tanto los procesos de tipo cliente como los de tipo servidor se ejecutan con el procesador en modo usuario.",
      "Tanto el micronúcleo como los procesos de tipo servidor se ejecutan con el procesador en modo núcleo."
    ],
    "a": 0,
    "source": "Examen Noviembre 2022 (Q6)",
    "explanation": "Solución oficial (A): Tanto los procesos de tipo cliente como los de tipo servidor se ejecutan con el procesador en modo usuario."
  },
  {
    "id": "examen_noviembre_2022_7",
    "t": "T2",
    "q": "En un sistema operativo UNIX, la ejecución de la llamada al sistema fork() por parte de un proceso:",
    "opts": [
      "Crea un proceso hijo que es idéntico al proceso que ejecuta la llamada al sistema, salvo que se le pase como argumento un binario, en cuyo caso lo usará para establecer el código y los datos del hijo en el momento de la creación.",
      "Crea siempre un proceso hijo que es idéntico al proceso que ejecuta la llamada al sistema, si bien el PID del padre y del hijo son diferentes."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q7)",
    "explanation": "Solución oficial (B): Crea siempre un proceso hijo que es idéntico al proceso que ejecuta la llamada al sistema, si bien el PID del padre y del hijo son diferentes."
  },
  {
    "id": "examen_noviembre_2022_8",
    "t": "T2",
    "q": "En un sistema operativo UNIX, cuando un proceso P realiza una llamada al sistema y hasta que comienza a ejecutarse el código correspondiente del sistema operativo se producen:",
    "opts": [
      "Un cambio de modo y un cambio de contexto.",
      "Un cambio de proceso, un cambio de modo y un cambio de contexto."
    ],
    "a": 0,
    "source": "Examen Noviembre 2022 (Q8)",
    "explanation": "Solución oficial (A): Un cambio de modo y un cambio de contexto."
  },
  {
    "id": "examen_noviembre_2022_9",
    "t": "T2",
    "q": "Un ejemplo de terminación voluntaria de un proceso como consecuencia de un error serı́a:",
    "opts": [
      "Que el proceso compruebe que el número de argumentos pasados no es el requerido y no pueda continuar con la ejecución.",
      "Que el proceso trate de realizar un acceso a memoria a una dirección para la cual no tenga permiso."
    ],
    "a": 0,
    "source": "Examen Noviembre 2022 (Q9)",
    "explanation": "Solución oficial (A): Que el proceso compruebe que el número de argumentos pasados no es el requerido y no pueda continuar con la ejecución."
  },
  {
    "id": "examen_noviembre_2022_11",
    "t": "T2",
    "q": "Un proceso que se encuentra en estado ≪ Bloqueado Suspendido ≫ , cambiará de estado...:",
    "opts": [
      "Únicamente cuando el planificador a medio plazo (PMP) ası́ lo decida.",
      "Cuando el planificador a medio plazo (PMP) ası́ lo decida o cuando ocurra el evento de E/S que estaba esperando."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q11)",
    "explanation": "Solución oficial (B): Cuando el planificador a medio plazo (PMP) ası́ lo decida o cuando ocurra el evento de E/S que estaba esperando."
  },
  {
    "id": "examen_noviembre_2022_14",
    "t": "T2",
    "q": "En cuanto al bloque de control de un proceso, es cierto que:",
    "opts": [
      "Almacena los valores de los registros de la CPU tal y como estaban la última vez que al proceso se le quitó la CPU.",
      "Almacena los datos de la pila del proceso tal y como estaban la última vez que al proceso se le quitó la CPU."
    ],
    "a": 0,
    "source": "Examen Noviembre 2022 (Q14)",
    "explanation": "Solución oficial (A): Almacena los valores de los registros de la CPU tal y como estaban la última vez que al proceso se le quitó la CPU."
  },
  {
    "id": "examen_noviembre_2022_15",
    "t": "T2",
    "q": "En UNIX, dados dos procesos, P y Q, si suponemos que ambos realizan una llamada al sistema en el mismo instante de tiempo:",
    "opts": [
      "Primero se completará la llamada al sistema de uno de ellos y después la del otro, pero al haber una única copia del SO en memoria, nunca se podrá simultanear la ejecución de las dos llamadas al sistema.",
      "Ambas llamadas al sistema podrı́an ejecutarse simultáneamente (o concurrentemente)"
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q15)",
    "explanation": "Solución oficial (B): Ambas llamadas al sistema podrı́an ejecutarse simultáneamente (o concurrentemente)"
  },
  {
    "id": "examen_noviembre_2022_17",
    "t": "T2",
    "q": "Dado un proceso, P, con dos hilos, H1 y H2, la CPU podrá pasar de ejecutar H1 a H2 (o viceversa) sin la intervención del sistema operativo:",
    "opts": [
      "Cuando los hilos estén implementados a nivel usuario.",
      "Cuando los hilos estén implementados en el núcleo del sistema operativo."
    ],
    "a": 0,
    "source": "Examen Noviembre 2022 (Q17)",
    "explanation": "Solución oficial (A): Cuando los hilos estén implementados a nivel usuario."
  },
  {
    "id": "examen_noviembre_2022_18",
    "t": "T2",
    "q": "Dado un proceso P con 4 hilos ejecutándose sobre una CPU con 4 núcleos de procesamiento (cores), los 4 hilos podrán ejecutarse simultáneamente (uno en cada núcleo):",
    "opts": [
      "Solamente si se implementa soporte para los hilos a nivel de núcleo en el sistema operativo.",
      "Siempre, independientemente de cómo estén implementados los hilos."
    ],
    "a": 0,
    "source": "Examen Noviembre 2022 (Q18)",
    "explanation": "Solución oficial (A): Solamente si se implementa soporte para los hilos a nivel de núcleo en el sistema operativo."
  },
  {
    "id": "examen_noviembre_2022_19",
    "t": "T2",
    "q": "Para un planificador de procesos cuya meta fundamental es la de maximizar la eficiencia en el uso de la CPU:",
    "opts": [
      "Es más conveniente usar un algoritmo de planificación apropativo.",
      "Es más conveniente usar un algoritmo de planificación no apropativo."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q19)",
    "explanation": "Solución oficial (B): Es más conveniente usar un algoritmo de planificación no apropativo."
  },
  {
    "id": "examen_noviembre_2022_20",
    "t": "T4",
    "q": "En relación con la planificación de procesos, el tiempo de espera de un proceso es:",
    "opts": [
      "El tiempo que hay que esperar desde que empieza el proceso hasta que se obtienen sus resultados.",
      "El tiempo que pasa el proceso en la cola de procesos listos."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q20)",
    "explanation": "Solución oficial (B): El tiempo que pasa el proceso en la cola de procesos listos."
  },
  {
    "id": "examen_noviembre_2022_21",
    "t": "T2",
    "q": "En relación a la planificación de procesos, la planificación SJF (Shortest Job First):",
    "opts": [
      "Es apropiativa, puesto que debe asegurar que el proceso en ejecución es en todo momento el de ráfaga de CPU más corta de entre todos los de la cola de listos y el propio proceso que actualmente tiene en la CPU.",
      "Es no apropiativa, pues al proceso que está usando la CPU nunca se le puede quitar su uso por muy larga que sea su ráfaga actual y por muy cortas que sean las ráfagas de CPU previstas para los procesos que están en la cola de listos."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q21)",
    "explanation": "Solución oficial (B): Es no apropiativa, pues al proceso que está usando la CPU nunca se le puede quitar su uso por muy larga que sea su ráfaga actual y por muy cortas que sean las ráfagas de CPU previstas para los procesos que están en la cola de listos."
  },
  {
    "id": "examen_noviembre_2022_22",
    "t": "T2",
    "q": "La planificación Round Robin:",
    "opts": [
      "Es no apropiativa, pues hasta que el proceso que está en ejecución no consuma su quantum, el sistema operativo no se puede apropiar de la CPU para dársela a otro proceso.",
      "Es apropiativa, pues el proceso que está en ejecución puede ser desalojado de la CPU sin haberse bloqueado ni haber finalizado."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q22)",
    "explanation": "Solución oficial (B): Es apropiativa, pues el proceso que está en ejecución puede ser desalojado de la CPU sin haberse bloqueado ni haber finalizado."
  },
  {
    "id": "examen_noviembre_2022_23",
    "t": "T2",
    "q": "De entre los algoritmos de planificación de la CPU vistos en clase, la situación de inanición (starvation) por la que un proceso podrı́a no llegar a usar nunca la CPU, podrı́a darse con:",
    "opts": [
      "SRTF y SJF.",
      "FCFS y planificación con prioridades estáticas."
    ],
    "a": 0,
    "source": "Examen Noviembre 2022 (Q23)",
    "explanation": "Solución oficial (A): SRTF y SJF."
  },
  {
    "id": "examen_noviembre_2022_24",
    "t": "T2",
    "q": "Dado un algoritmo de planificación Round Robin con un valor de quantum de q unidades de tiempo (u.t.) y un sistema en el que hay en todo momento N procesos (no necesariamente los mismos) en la cola de listos, el tiempo que transcurre desde que un proceso agota su quantum y se le quita la CPU, hasta que la vuelve a tomar es siempre:",
    "opts": [
      "Exactamente igual a q×(N-1) u.t.",
      "Menor o igual a q×(N-1) u.t."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q24)",
    "explanation": "Solución oficial (B): Menor o igual a q×(N-1) u.t."
  },
  {
    "id": "examen_noviembre_2022_25",
    "t": "T2",
    "q": "Tenemos una planificación de procesos SJF con estimación de tiempo de ráfaga de CPU. Hay 2 procesos en la cola de listos: P1 y P2. En la última ráfaga de CPU, las estimaciones para P1 y P2 fueron E1 y E2, respectivamente, y los tiempos reales T1 y T2, respectivamente. Entonces:",
    "opts": [
      "Si E1=E2 y T1<T2 pasará ejecutarse P1.",
      "Si E1>E2 y T1=T2 pasará a ejecutarse P1."
    ],
    "a": 0,
    "source": "Examen Noviembre 2022 (Q25)",
    "explanation": "Solución oficial (A): Si E1=E2 y T1<T2 pasará ejecutarse P1."
  },
  {
    "id": "examen_noviembre_2022_26",
    "t": "T2",
    "q": "Dados dos procesos P1 y P2, si en el instante ≪ t ≫ P2 comienza la ejecución del segundo de los tics de una ráfaga de CPU de duración 5 y se desbloquea P1 cuya siguiente ráfaga de CPU tiene una duración de 2 tics, en el instante ≪ t+1 ≫ se ejecutará:",
    "opts": [
      "P2 si el planificador es SRTF ≪ oráculo ≫ .",
      "P1 si el planificador es Round Robin con q=2 tics."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q26)",
    "explanation": "Solución oficial (B): P1 si el planificador es Round Robin con q=2 tics."
  },
  {
    "id": "examen_noviembre_2022_27",
    "t": "T2",
    "q": "Considera dos procesos P1 y P2 en estado ≪ Bloqueado ≫ y el esquema de planificación Round Robin: si en el instante ≪ t ≫ la CPU está ocupada y ambos se desbloquean para ejecutar una ráfaga de CPU de 2 tics (P1) y 5 tics (P2), en el instante ≪ t+1 ≫ , suponiendo que la CPU queda libre y que estos son los únicos procesos en la cola de listos, se ejecutará:",
    "opts": [
      "P1 o P2 dependiendo del orden en el que se inserten en la cola de listos en el instante ≪ t ≫ .",
      "P1 siempre, por tener una duración menor de ráfaga de CPU."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q27)",
    "explanation": "Solución oficial (B): P1 siempre, por tener una duración menor de ráfaga de CPU."
  },
  {
    "id": "examen_noviembre_2022_28",
    "t": "T2",
    "q": "Supón un esquema de planificación ≪ apropiativo con prioridades dinámicas ≫ (a mayor número, mayor prioridad) en el que, para evitar la inanición, la prioridad de un proceso se aumenta en 2 cada tic que el proceso está en la cola de listos. Si al comienzo del tic ≪ t ≫ se empieza a ejecutar un proceso P1 con prioridad 4 con una ráfaga de CPU de duración 5 tics, y en ese mismo momento se desbloquea y se inserta en la cola de listos un proceso P2 con prioridad 1 y ráfaga de CPU de 4 tics, P2 pasará a usar la CPU:",
    "opts": [
      "En el instante ≪ t+2 ≫ .",
      "En el instante ≪ t+3 ≫ ."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q28)",
    "explanation": "Solución oficial (B): En el instante ≪ t+3 ≫ ."
  },
  {
    "id": "examen_noviembre_2022_29",
    "t": "T2",
    "q": "Considera una planificación de procesos apropiativa con 2 colas (cola 0 de mayor prioridad, cola 1 de menor prioridad) sin posibilidad de que los procesos cambien de cola. Ambas colas se planifican internamente con sendos algoritmos Round Robin con quantum de 2 tics. Si en este instante a la cola 0 llega el proceso P0 y a la cola 1 llega el proceso P1, queriendo ambos procesos ejecutar sendas ráfagas de CPU de 4 tics. ¿Qué ocurrirá en los próximos 4 tics?:",
    "opts": [
      "Se ejecutará P0 durante 4 tics y, entonces, se cederá la CPU a P1.",
      "Se ejecutará P0 durante 2 tics y, entonces, se cederá la CPU a P1 durante otros 2 tics."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q29)",
    "explanation": "Solución oficial (B): Se ejecutará P0 durante 2 tics y, entonces, se cederá la CPU a P1 durante otros 2 tics."
  },
  {
    "id": "examen_noviembre_2022_31",
    "t": "T1",
    "q": "Una invención de la información es:",
    "opts": [
      "Una amenaza a la integridad de la información.",
      "Una amenaza a la confidencialidad de la información."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q31)",
    "explanation": "Solución oficial (B): Una amenaza a la confidencialidad de la información."
  },
  {
    "id": "examen_noviembre_2022_32",
    "t": "T2",
    "q": "El concepto de dominio de protección se asocia a:",
    "opts": [
      "Los procesos y define los objetos a los que puede acceder cada uno de ellos y con qué permisos.",
      "Los objetos y define los procesos que pueden acceder a cada uno de ellos y con qué permisos."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q32)",
    "explanation": "Solución oficial (B): Los objetos y define los procesos que pueden acceder a cada uno de ellos y con qué permisos."
  },
  {
    "id": "examen_noviembre_2022_35",
    "t": "T4",
    "q": "En UNIX, durante la realización del proceso de login por parte de un usuario:",
    "opts": [
      "Se accede únicamente al fichero /etc/passwd para la validación de la contraseña introdu- cida por el usuario.",
      "Además de a /etc/shadow, es necesario también acceder al fichero /etc/passwd."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q35)",
    "explanation": "Solución oficial (B): Además de a /etc/shadow, es necesario también acceder al fichero /etc/passwd."
  },
  {
    "id": "examen_noviembre_2022_36",
    "t": "T4",
    "q": "En UNIX, si desde el intérprete de órdenes se ejecuta el programa passwd, cuyo fichero ejecutable pertenece al usuario root y tiene el bit SETUID activado, entonces, el proceso resultante:",
    "opts": [
      "Ejecutará el programa passwd con el procesador en modo usuario.",
      "Ejecutará el programa passwd con el procesador en modo núcleo."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q36)",
    "explanation": "Solución oficial (B): Ejecutará el programa passwd con el procesador en modo núcleo."
  },
  {
    "id": "examen_noviembre_2022_38",
    "t": "T4",
    "q": "La creación de la entrada de directorio para un nuevo fichero regular, se realiza:",
    "opts": [
      "A través de la llamada al sistema Create usada para crear el fichero.",
      "Mediante la llamada al sistema Writedir aplicada al directorio en el que quedará el fichero."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q38)",
    "explanation": "Solución oficial (B): Mediante la llamada al sistema Writedir aplicada al directorio en el que quedará el fichero."
  },
  {
    "id": "examen_noviembre_2022_39",
    "t": "T4",
    "q": "Dado un fichero regular con tamaño T bytes, si el tamaño de bloque lógico es B bytes y se cumple que T>B, entonces el número de bloques lógicos que se utilizarán para almacenar su contenido:",
    "opts": [
      "Será mayor para la estrategia de implementación de ficheros de lista ligada con ı́ndice que para la basada en nodos-i.",
      "Será igual para las estrategias de implementación de ficheros de asignación contigua y lista ligada con ı́ndice."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q39)",
    "explanation": "Solución oficial (B): Será igual para las estrategias de implementación de ficheros de asignación contigua y lista ligada con ı́ndice."
  },
  {
    "id": "examen_noviembre_2022_40",
    "t": "T4",
    "q": "En cuanto a la fragmentación interna:",
    "opts": [
      "Puede aparecer en la estrategia de implementación de ficheros de asignación contigua pero no en la basada en nodos-i.",
      "Puede aparecer tanto en la estrategia de implementación de ficheros basada en nodos-i como en las basadas en lista ligada."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q40)",
    "explanation": "Solución oficial (B): Puede aparecer tanto en la estrategia de implementación de ficheros basada en nodos-i como en las basadas en lista ligada."
  },
  {
    "id": "examen_noviembre_2022_41",
    "t": "T4",
    "q": "En una implementación de ficheros mediante lista ligada sin ı́ndice, el valor del byte Z del bloque X (X ̸ = 0) de un fichero cuyo primer bloque (el bloque 0) se encuentra en la dirección D de disco puede obtenerse:",
    "opts": [
      "Leyendo X+1 bloques del disco.",
      "Leyendo D+X bloques del disco."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q41)",
    "explanation": "Solución oficial (B): Leyendo D+X bloques del disco."
  },
  {
    "id": "examen_noviembre_2022_42",
    "t": "T4",
    "q": "Dado un sistema de ficheros tipo UNIX, suponiendo la estructura de nodos-i vista en clase con un total de 13 punteros, que todas las entradas de directorio tienen una longitud de exactamente 256 bytes y que el tamaño de bloque lógico es de 1 KiB, un directorio con 50 entradas (sin incluir las entradas ≪ . ≫ y ≪ .. ≫ ) ocupa un total de:",
    "opts": [
      "13 bloques lógicos de la zona de datos.",
      "14 bloques lógicos de la zona de datos."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q42)",
    "explanation": "Solución oficial (B): 14 bloques lógicos de la zona de datos."
  },
  {
    "id": "examen_noviembre_2022_43",
    "t": "T4",
    "q": "Supón dos sistemas de ficheros, SF1 de tipo MS-DOS y SF2 de tipo UNIX, ambos usando el mismo tamaño de bloque lógico de B bytes. Dado un directorio D cuyas entradas ocupan exactamente 1 bloque de la zona de datos tanto en SF1 como en SF2 y que tanto el ı́ndice en SF1 como el nodo-i de D en SF2 están ya cargados en memoria (lo indicado es lo único que hay en memoria en ese momento), el número de accesos a disco para obtener un listado de los ficheros regulares de D junto con su tamaño:",
    "opts": [
      "Será igual en SF1 y SF2.",
      "Será mayor en SF2 que en SF1."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q43)",
    "explanation": "Solución oficial (B): Será mayor en SF2 que en SF1."
  },
  {
    "id": "examen_noviembre_2022_44",
    "t": "T4",
    "q": "Si suponemos que cualquier directorio ocupa un solo bloque de la zona de datos, que tanto el nodo-i del directorio raı́z como su bloque de datos se encuentran ya en memoria, y que ca- da nodo-i se encuentra en un bloque diferente, entonces para poder leer el byte X del fichero /home/alumno/ExamenISO/ejercicio1.sh habrá que leer:",
    "opts": [
      "9 bloques de disco como mı́nimo.",
      "11 bloques de disco como máximo."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q44)",
    "explanation": "Solución oficial (B): 11 bloques de disco como máximo."
  },
  {
    "id": "examen_noviembre_2022_45",
    "t": "T4",
    "q": "En UNIX, si creamos el fichero regular F1 y seguidamente creamos un enlace simbólico a F1 llamado ES F1 :",
    "opts": [
      "El valor del contador de enlaces tanto para ES F1 como para F1 será 1.",
      "El valor del contador de enlaces tanto para ES F1 como para F1 será 2."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q45)",
    "explanation": "Solución oficial (B): El valor del contador de enlaces tanto para ES F1 como para F1 será 2."
  },
  {
    "id": "examen_noviembre_2022_46",
    "t": "T4",
    "q": "Dado un sistema de ficheros con un tamaño de bloque lógico de B bytes, direcciones de disco de D bytes y una zona de bloques de datos de N bloques, el número de bloques lógicos requeridos para llevar el registro de los bloques libres es:",
    "opts": [
      "⌈ N ⌉ si se usa la estrategia del mapa de bits. 8×B",
      "⌈ N×D ⌉ si se usa la estrategia de la lista ligada de bloques. 8×B"
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q46)",
    "explanation": "Solución oficial (B): ⌈ N×D ⌉ si se usa la estrategia de la lista ligada de bloques. 8×B"
  },
  {
    "id": "examen_noviembre_2022_47",
    "t": "T2",
    "q": "En cuanto a la caché de disco, es cierto que:",
    "opts": [
      "Es una colección de bloques que pertenecen, desde el punto de vista lógico, al disco, pero que se mantienen temporalmente en la memoria principal.",
      "Es una colección de bloques que pertenecen, desde el punto de vista lógico, a la memoria principal, pero que se mantienen temporalmente en disco."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q47)",
    "explanation": "Solución oficial (B): Es una colección de bloques que pertenecen, desde el punto de vista lógico, a la memoria principal, pero que se mantienen temporalmente en disco."
  },
  {
    "id": "examen_noviembre_2022_48",
    "t": "T4",
    "q": "El algoritmo de reemplazo discutido en clase usado en una caché de disco:",
    "opts": [
      "Siempre da prioridad al reemplazo de los bloques de metadatos que se han modificado, para evitar inconsistencias en el sistema de ficheros.",
      "Entre dos bloques con datos de ficheros, reemplazará siempre antes al que más tiempo hace que no se usa."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q48)",
    "explanation": "Solución oficial (B): Entre dos bloques con datos de ficheros, reemplazará siempre antes al que más tiempo hace que no se usa."
  },
  {
    "id": "examen_noviembre_2022_49",
    "t": "T4",
    "q": "Dado un disco con un total de N sectores de S bytes cada uno, en general, aumentar el tamaño de bloque lógico de B a 4 × B bytes provoca que:",
    "opts": [
      "El tamaño en bytes de los nodos-i aumente.",
      "El número de bits del mapa de bits para bloques de datos disminuya."
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q49)",
    "explanation": "Solución oficial (B): El número de bits del mapa de bits para bloques de datos disminuya."
  },
  {
    "id": "examen_noviembre_2022_50",
    "t": "T4",
    "q": "Dado un sistema de ficheros tipo UNIX, en el que hay un total de I nodos-i, cada uno con un tamaño de S bytes, y en el que el tamaño de bloque lógico es de B bytes, si en un instante determinado se emplean un total de N bloques indirectos (BSI, BDI y BTI), el tamaño total de la tabla de nodos-i en ese instante será de:",
    "opts": [
      "⌈ I×S ⌉ bloques lógicos. B",
      "⌈ I×S ⌉ + N bloques lógicos. B Introducción a los Sistemas Operativos Examen de teorı́a: test (A). 25 de noviembre de 2022 Grupo: DNI: Apellidos: Nombre: Nº a b Respuestas Nº a b 1 X 26 X 2 X 27 X 3 X 28 X 4 X 29 X 5 X 30 X 6 X 31 X 7 X 32 X 8 X 33 X 9 X 34 X 10 X 35 X 11 X 36 X 12 X 37 X 13 X 38 X 14 X 39 X 15 X 40 X 16 X 41 X 17 X 42 X 18 X 43 X 19 X 44 X 20 X 45 X 21 X 46 X 22 X 47 X 23 X 48 X 24 X 49 X 25 X 50 X"
    ],
    "a": 1,
    "source": "Examen Noviembre 2022 (Q50)",
    "explanation": "Solución oficial (B): ⌈ I×S ⌉ + N bloques lógicos. B Introducción a los Sistemas Operativos Examen de teorı́a: test (A). 25 de noviembre de 2022 Grupo: DNI: Apellidos: Nombre: Nº a b Respuestas Nº a b 1 X 26 X 2 X 27 X 3 X 28 X 4 X 29 X 5 X 30 X 6 X 31 X 7 X 32 X 8 X 33 X 9 X 34 X 10 X 35 X 11 X 36 X 12 X 37 X 13 X 38 X 14 X 39 X 15 X 40 X 16 X 41 X 17 X 42 X 18 X 43 X 19 X 44 X 20 X 45 X 21 X 46 X 22 X 47 X 23 X 48 X 24 X 49 X 25 X 50 X"
  },
  {
    "id": "parcial_i_oficial_2",
    "t": "T1",
    "q": "En relación a la protección del sistema operativo, el procesador debe disponer de dos modos de ejecución (modo núcleo y modo usuario):",
    "opts": [
      "Para evitar que el sistema se bloquee porque un programa se haga con el control de la CPU (por ejemplo, porque entre en un bucle infinito).",
      "Para evitar que un programa pueda ejecutar ciertas instrucciones de la CPU, como, por ejemplo, las de E/S."
    ],
    "a": 1,
    "source": "Parcial I Oficial (Q2)",
    "explanation": "Solución oficial (B): Para evitar que un programa pueda ejecutar ciertas instrucciones de la CPU, como, por ejemplo, las de E/S."
  },
  {
    "id": "parcial_i_oficial_4",
    "t": "T2",
    "q": "Un mismo proceso puede comprender varios programas,",
    "opts": [
      "y un mismo programa puede dar lugar a varios procesos.",
      "pero un programa solamente puede dar lugar a un único proceso."
    ],
    "a": 0,
    "source": "Parcial I Oficial (Q4)",
    "explanation": "Solución oficial (A): y un mismo programa puede dar lugar a varios procesos."
  },
  {
    "id": "parcial_i_oficial_6",
    "t": "T2",
    "q": "Cuando un proceso P i hace una llamada al sistema fork():",
    "opts": [
      "Se crea un nuevo proceso P j que es una copia idéntica del P i , con lo que ambos procesos, P i y P j , podrán modificar los datos que tienen compartidos en memoria RAM.",
      "Se crea un nuevo proceso P j que continúa su ejecución de manera independiente de P i ."
    ],
    "a": 1,
    "source": "Parcial I Oficial (Q6)",
    "explanation": "Solución oficial (B): Se crea un nuevo proceso P j que continúa su ejecución de manera independiente de P i ."
  },
  {
    "id": "parcial_i_oficial_7",
    "t": "T2",
    "q": "Cuando un proceso P i hace una llamada al sistema exec():",
    "opts": [
      "Se crea un nuevo proceso P j con el código y datos del programa que se indica como argumento a la llamada.",
      "El proceso P i sustituye su código y datos por los del programa cuyo nombre se indica como argumento a la llamada. A continuación, P i comienza la ejecución del nuevo código desde el principio."
    ],
    "a": 1,
    "source": "Parcial I Oficial (Q7)",
    "explanation": "Solución oficial (B): El proceso P i sustituye su código y datos por los del programa cuyo nombre se indica como argumento a la llamada. A continuación, P i comienza la ejecución del nuevo código desde el principio."
  },
  {
    "id": "parcial_i_oficial_8",
    "t": "T2",
    "q": "En relación con el estado de un proceso:",
    "opts": [
      "Un proceso pasa directamente de estado “en ejecución” a “listo” cuando lo decide el planificador, independientemente del código que esté ejecutando dicho proceso.",
      "Un proceso pasa directamente de estado “bloqueado” a estado “en ejecución” cuando el evento externo que está esperando ya ha finalizado exitosamente, con lo que dicho proceso puede continuar su ejecución."
    ],
    "a": 0,
    "source": "Parcial I Oficial (Q8)",
    "explanation": "Solución oficial (A): Un proceso pasa directamente de estado “en ejecución” a “listo” cuando lo decide el planificador, independientemente del código que esté ejecutando dicho proceso."
  },
  {
    "id": "parcial_i_oficial_9",
    "t": "T2",
    "q": "El Planificador a Medio Plazo (PMP) se encarga de decidir:",
    "opts": [
      "Si un proceso en estado “bloqueado suspendido” pasa directamente a estado “listo sus- pendido”.",
      "Si un proceso en estado “bloqueado suspendido” pasa directamente a estado “bloqueado”."
    ],
    "a": 1,
    "source": "Parcial I Oficial (Q9)",
    "explanation": "Solución oficial (B): Si un proceso en estado “bloqueado suspendido” pasa directamente a estado “bloqueado”."
  },
  {
    "id": "parcial_i_oficial_10",
    "t": "T2",
    "q": "El Bloque de Control de Procesos (BCP) de un proceso de usuario:",
    "opts": [
      "Contiene todo aquello que está relacionado con dicho proceso: su código, sus datos, su pila,...",
      "No puede ser modificado directamente por dicho proceso, sino únicamente por el sistema operativo."
    ],
    "a": 1,
    "source": "Parcial I Oficial (Q10)",
    "explanation": "Solución oficial (B): No puede ser modificado directamente por dicho proceso, sino únicamente por el sistema operativo."
  },
  {
    "id": "parcial_i_oficial_11",
    "t": "T2",
    "q": "En Unix, cuando un proceso de usuario realiza una llamada al sistema:",
    "opts": [
      "Dicho proceso pasa de modo usuario a modo núcleo y ejecuta el código oportuno.",
      "Se produce un cambio de proceso en CPU: el proceso de usuario pasa a estado bloqueado mientras que el proceso del sistema operativo toma el control en modo núcleo para atender dicha llamada."
    ],
    "a": 0,
    "source": "Parcial I Oficial (Q11)",
    "explanation": "Solución oficial (A): Dicho proceso pasa de modo usuario a modo núcleo y ejecuta el código oportuno."
  },
  {
    "id": "parcial_i_oficial_12",
    "t": "T2",
    "q": "Tenemos un proceso P i que tiene 2 hilos H i1 y H i2 . Entonces:",
    "opts": [
      "H i1 y H i2 son exactamente iguales, por lo que ejecutan las mismas instrucciones con lo mismos datos.",
      "H i1 y H i2 comparten los datos del proceso pero pueden ejecutar instrucciones diferentes."
    ],
    "a": 1,
    "source": "Parcial I Oficial (Q12)",
    "explanation": "Solución oficial (B): H i1 y H i2 comparten los datos del proceso pero pueden ejecutar instrucciones diferentes."
  },
  {
    "id": "parcial_i_oficial_13",
    "t": "T2",
    "q": "En una implementación de hilos a nivel de usuario, si el hilo de un proceso realiza una llamada al sistema bloqueante:",
    "opts": [
      "Se bloqueará completamente el proceso y todos sus hilos.",
      "Se bloquearán solamente el hilo que hizo la llamada y aquellos otros hilos del proceso que dependan de la resolución de dicha llamada."
    ],
    "a": 0,
    "source": "Parcial I Oficial (Q13)",
    "explanation": "Solución oficial (A): Se bloqueará completamente el proceso y todos sus hilos."
  },
  {
    "id": "parcial_i_oficial_15",
    "t": "T2",
    "q": "La necesidad de planificación de trabajos en CPU:",
    "opts": [
      "surge desde el momento en que se tienen varios trabajos en CPU que se encuentren blo- queados a la espera de poder utilizar la E/S.",
      "surge desde el momento en que se tienen varios trabajos en memoria que pueden ejecutarse."
    ],
    "a": 1,
    "source": "Parcial I Oficial (Q15)",
    "explanation": "Solución oficial (B): surge desde el momento en que se tienen varios trabajos en memoria que pueden ejecutarse."
  },
  {
    "id": "parcial_i_oficial_18",
    "t": "T2",
    "q": "El dominio de protección...",
    "opts": [
      "donde se ejecuta un proceso define los objetos a los que puede acceder dicho proceso y con qué permisos.",
      "de un objeto define los procesos que pueden acceder a dicho objeto y con qué permisos."
    ],
    "a": 0,
    "source": "Parcial I Oficial (Q18)",
    "explanation": "Solución oficial (A): donde se ejecuta un proceso define los objetos a los que puede acceder dicho proceso y con qué permisos."
  },
  {
    "id": "parcial_i_oficial_19",
    "t": "T4",
    "q": "En Unix, por defecto, la ACL de cada fichero es restringida porque:",
    "opts": [
      "se limita a tres permisos: lectura, escritura y ejecución.",
      "se limita a tres conjuntos de usuarios: propietario, grupo y otros."
    ],
    "a": 1,
    "source": "Parcial I Oficial (Q19)",
    "explanation": "Solución oficial (B): se limita a tres conjuntos de usuarios: propietario, grupo y otros."
  },
  {
    "id": "parcial_i_oficial_20",
    "t": "T4",
    "q": "En Unix, si un fichero ejecutable tiene el bit SETUID activo, entonces si un usuario lo ejecuta:",
    "opts": [
      "el proceso que se crea no tendrá el EUID de dicho usuario sino del propietario del fichero.",
      "el proceso que se crea no tendrá el EUID del propietario del fichero sino del usuario que lo ejecuta."
    ],
    "a": 0,
    "source": "Parcial I Oficial (Q20)",
    "explanation": "Solución oficial (A): el proceso que se crea no tendrá el EUID de dicho usuario sino del propietario del fichero."
  },
  {
    "id": "parcial_i_oficial_21",
    "t": "T4",
    "q": "Existen 2 tipos de ficheros regulares:",
    "opts": [
      "Ficheros especiales de bloques y ficheros especiales de caracteres.",
      "Ficheros de texto y ficheros binarios."
    ],
    "a": 1,
    "source": "Parcial I Oficial (Q21)",
    "explanation": "Solución oficial (B): Ficheros de texto y ficheros binarios."
  },
  {
    "id": "parcial_i_oficial_22",
    "t": "T4",
    "q": "Para un fichero (o un directorio):",
    "opts": [
      "Existen innumerables rutas relativas.",
      "Existen dos rutas absolutas: una partiendo del directorio raı́z y otra partiendo desde el directorio actual."
    ],
    "a": 0,
    "source": "Parcial I Oficial (Q22)",
    "explanation": "Solución oficial (A): Existen innumerables rutas relativas."
  },
  {
    "id": "parcial_i_oficial_23",
    "t": "T4",
    "q": "Para realizar una lectura de un directorio:",
    "opts": [
      "Se utiliza la operación read (como en los ficheros) pues los directorios son simplemente un tipo de ficheros.",
      "Se utiliza la operación readdir debido a que el sistema operativo es el que determina el formato de los directorios."
    ],
    "a": 1,
    "source": "Parcial I Oficial (Q23)",
    "explanation": "Solución oficial (B): Se utiliza la operación readdir debido a que el sistema operativo es el que determina el formato de los directorios."
  },
  {
    "id": "parcial_i_oficial_24",
    "t": "T4",
    "q": "En una implementación de ficheros mediante lista ligada sin ı́ndice, para la lectura del byte Z, perte- neciente al bloque X de un fichero F cuyo primer bloque (el bloque 0) se encuentra en la dirección D de disco,",
    "opts": [
      "se tendrá que leer únicamente el bloque D+X del disco.",
      "se tendrán que leer X+1 bloques del disco."
    ],
    "a": 1,
    "source": "Parcial I Oficial (Q24)",
    "explanation": "Solución oficial (B): se tendrán que leer X+1 bloques del disco."
  },
  {
    "id": "parcial_i_oficial_25",
    "t": "T4",
    "q": "Si suponemos que cualquier directorio tiene sólo un bloque de datos, que tanto el nodo-i del directorio raı́z como su bloque de datos se encuentran ya en memoria, y que cada nodo-i se encuentra en un blo- que diferente, entonces para poder leer el primer byte del fichero /home/alumno/apuntes/tema1.pdf:",
    "opts": [
      "Habrá que leer 8 bloques de disco.",
      "Habrá que leer 7 bloques de disco."
    ],
    "a": 0,
    "source": "Parcial I Oficial (Q25)",
    "explanation": "Solución oficial (A): Habrá que leer 8 bloques de disco."
  },
  {
    "id": "parcial_i_oficial_26",
    "t": "T1",
    "q": "Una caché de disco:",
    "opts": [
      "es una colección de bloques que pertenecen, desde el punto de vista lógico, al disco, pero que se mantienen temporalmente en la memoria principal.",
      "es una colección de bloques que pertenecen, desde el punto de vista lógico, a la memoria principal, pero que se mantienen temporalmente en disco."
    ],
    "a": 0,
    "source": "Parcial I Oficial (Q26)",
    "explanation": "Solución oficial (A): es una colección de bloques que pertenecen, desde el punto de vista lógico, al disco, pero que se mantienen temporalmente en la memoria principal."
  },
  {
    "id": "parcial_i_oficial_27",
    "t": "T4",
    "q": "En una implementación de ficheros mediante lista ligada e ı́ndice, el tamaño de la tabla o ı́ndice:",
    "opts": [
      "Depende del tamaño del dispositivo de almacenamiento y del tamaño de los bloques.",
      "Depende del tamaño de los ficheros y del tamaño de los bloques."
    ],
    "a": 0,
    "source": "Parcial I Oficial (Q27)",
    "explanation": "Solución oficial (A): Depende del tamaño del dispositivo de almacenamiento y del tamaño de los bloques."
  },
  {
    "id": "parcial_i_oficial_28",
    "t": "T4",
    "q": "En una implementación de ficheros mediante nodos-i,",
    "opts": [
      "Existe un única tabla para todo el sistema de ficheros, llamada nodo-i, que contiene un conjunto de punteros para acceder a todos los bloques del dispositivo de almacenamiento, bien directamente o través de bloques indirectos (BSI, BDI y BTI).",
      "La cantidad de memoria RAM utilizada para nodos-i depende del número de ficheros abiertos en un momento dado."
    ],
    "a": 1,
    "source": "Parcial I Oficial (Q28)",
    "explanation": "Solución oficial (B): La cantidad de memoria RAM utilizada para nodos-i depende del número de ficheros abiertos en un momento dado."
  },
  {
    "id": "parcial_i_oficial_29",
    "t": "T4",
    "q": "En Unix, si tenemos el fichero fic1 y creamos un enlace fı́sico llamado lin1 a dicho fichero y, tras ello, borramos fic1:",
    "opts": [
      "El enlace lin1 se quedará inconsistente, pues apuntará a un fichero que ya no existe.",
      "Se sigue pudiendo acceder mediante el enlace lin1 al contenido del fichero eliminado fic1."
    ],
    "a": 1,
    "source": "Parcial I Oficial (Q29)",
    "explanation": "Solución oficial (B): Se sigue pudiendo acceder mediante el enlace lin1 al contenido del fichero eliminado fic1."
  },
  {
    "id": "parcial_i_oficial_30",
    "t": "T4",
    "q": "Tenemos un disco donde el control de bloques libres de la zona de de datos se gestiona mediante un mapa de bits. Si en dicha zona se tiene que L bloques están libres y M bloques están ocupados:",
    "opts": [
      "El mapa de bits estará formado al menos por (L + M )/8 bytes.",
      "El mapa de bits estará formado por L bits. N o a b"
    ],
    "a": 0,
    "source": "Parcial I Oficial (Q30)",
    "explanation": "Solución oficial (A): El mapa de bits estará formado al menos por (L + M )/8 bytes."
  },
  {
    "id": "test_prueba_nov_2022_1",
    "t": "T1",
    "q": "A la hora de implementar las llamadas al sistema:",
    "opts": [
      "Suele existir un mecanismo hardware distinto para implementar cada categorı́a de llamadas al sistema, ya que puede haber grandes diferencias entre unos tipos de llamadas al sistema y otros.",
      "Todas suelen usar el mismo mecanismo proporcionado por el hardware a través del cual el procesador cambia de modo usuario a modo núcleo de forma controlada."
    ],
    "a": 1,
    "source": "Test Prueba Nov 2022 (Q1)",
    "explanation": "Solución oficial (B): Todas suelen usar el mismo mecanismo proporcionado por el hardware a través del cual el procesador cambia de modo usuario a modo núcleo de forma controlada."
  },
  {
    "id": "test_prueba_nov_2022_3",
    "t": "T2",
    "q": "El intérprete de órdenes es un programa del sistema que funciona:",
    "opts": [
      "en modo usuario, haciendo uso de las llamadas al sistema que proporciona el sistema operativo.",
      "dentro del núcleo del sistema operativo ya que necesita hacer operaciones que cualquier proceso de usuario no puede."
    ],
    "a": 0,
    "source": "Test Prueba Nov 2022 (Q3)",
    "explanation": "Solución oficial (A): en modo usuario, haciendo uso de las llamadas al sistema que proporciona el sistema operativo."
  },
  {
    "id": "test_prueba_nov_2022_4",
    "t": "T2",
    "q": "De los mecanismos de protección hardware que ayudan al sistema operativo a proteger el sistema:",
    "opts": [
      "No se puede prescindir de ninguno de los tres.",
      "Las interrupciones periódicas no son necesarias realmente, ya que no protegen de nada, mientras que el modo dual evita que se ejecuten instrucciones peligrosas y la protección de memoria evita que un proceso pueda salirse de la memoria asignada."
    ],
    "a": 0,
    "source": "Test Prueba Nov 2022 (Q4)",
    "explanation": "Solución oficial (A): No se puede prescindir de ninguno de los tres."
  },
  {
    "id": "test_prueba_nov_2022_6",
    "t": "T2",
    "q": "¿Por qué un sistema operativo se puede ver como una máquina extendida o virtual?",
    "opts": [
      "Porque oculta los detalles del hardware real y presenta una nueva interfaz de la máquina que se usa a través de llamadas al sistema.",
      "Porque, además de permitir el acceso a bajo nivel al hardware de la máquina por parte de los procesos cuando se encuentran en modo usuario, ofrece abstracciones adicionales que el hardware en sı́ mismo no posee."
    ],
    "a": 0,
    "source": "Test Prueba Nov 2022 (Q6)",
    "explanation": "Solución oficial (A): Porque oculta los detalles del hardware real y presenta una nueva interfaz de la máquina que se usa a través de llamadas al sistema."
  },
  {
    "id": "test_prueba_nov_2022_8",
    "t": "T2",
    "q": "El efecto convoy . . .",
    "opts": [
      "puede darse en un sistema que planifica el procesador con el algoritmo SJF.",
      "aparece en FCFS cuando varios procesos limitados por E/S tienen que estar esperando a que deje la CPU un proceso limitado por CPU."
    ],
    "a": 1,
    "source": "Test Prueba Nov 2022 (Q8)",
    "explanation": "Solución oficial (B): aparece en FCFS cuando varios procesos limitados por E/S tienen que estar esperando a que deje la CPU un proceso limitado por CPU."
  },
  {
    "id": "test_prueba_nov_2022_9",
    "t": "T2",
    "q": "Siempre que se cambia de modo usuario a modo núcleo . . .",
    "opts": [
      "Se hace dentro de un cambio de proceso, ya que un cambio de modo solamente no tiene sentido.",
      "Es porque se ha producido una interrupción, excepción o llamada al sistema."
    ],
    "a": 1,
    "source": "Test Prueba Nov 2022 (Q9)",
    "explanation": "Solución oficial (B): Es porque se ha producido una interrupción, excepción o llamada al sistema."
  },
  {
    "id": "test_prueba_nov_2022_10",
    "t": "T2",
    "q": "En Unix, un proceso que se desbloquea se despierta en . . .",
    "opts": [
      "el núcleo del SO, tras la función/instrucción que hizo que se bloqueara en última instancia.",
      "la instrucción en el código de usuario detrás de la llamada al sistema que provocó que fuera bloqueado."
    ],
    "a": 0,
    "source": "Test Prueba Nov 2022 (Q10)",
    "explanation": "Solución oficial (A): el núcleo del SO, tras la función/instrucción que hizo que se bloqueara en última instancia."
  },
  {
    "id": "test_prueba_nov_2022_11",
    "t": "T2",
    "q": "En el algoritmo de planificación de procesos de múltiples colas con realimentación, la realimentación significa:",
    "opts": [
      "Que un proceso puede pasar de una cola a otra.",
      "Que un proceso puede pasar de una cola a otra y que además se puede cambiar la posición de un proceso en su cola en cualquier momento."
    ],
    "a": 0,
    "source": "Test Prueba Nov 2022 (Q11)",
    "explanation": "Solución oficial (A): Que un proceso puede pasar de una cola a otra."
  },
  {
    "id": "test_prueba_nov_2022_12",
    "t": "T2",
    "q": "Indica cuál de los siguientes es un motivo por el que se lanza obligatoriamente el planificador de procesos.",
    "opts": [
      "Se ejecuta una llamada al sistema.",
      "Finaliza un proceso."
    ],
    "a": 1,
    "source": "Test Prueba Nov 2022 (Q12)",
    "explanation": "Solución oficial (B): Finaliza un proceso."
  },
  {
    "id": "test_prueba_nov_2022_13",
    "t": "T2",
    "q": "En la creación de procesos en Unix:",
    "opts": [
      "Tras la llamada a fork() tanto el proceso padre como el hijo tienen el mismo PID. La llamada a exec() es la que le asigna un nuevo PID al proceso que la ejecuta, al tiempo que construye su nueva imagen a partir del ejecutable.",
      "Tras la llamada a fork() los procesos padre e hijo tienen diferente PID. La llamada a exec() construye la nueva imagen del proceso a partir del ejecutable, sin alterar su PID."
    ],
    "a": 1,
    "source": "Test Prueba Nov 2022 (Q13)",
    "explanation": "Solución oficial (B): Tras la llamada a fork() los procesos padre e hijo tienen diferente PID. La llamada a exec() construye la nueva imagen del proceso a partir del ejecutable, sin alterar su PID."
  },
  {
    "id": "test_prueba_nov_2022_14",
    "t": "T2",
    "q": "Supongamos un proceso por lotes con las siguientes ráfagas: CPU E/S CPU 4 3 3 Si el proceso llega en el instante 11 y termina en el 23 entonces:",
    "opts": [
      "Su tiempo de retorno es 13 y su tiempo de espera 2.",
      "Su tiempo de retorno es 12 y su tiempo de espera 2."
    ],
    "a": 1,
    "source": "Test Prueba Nov 2022 (Q14)",
    "explanation": "Solución oficial (B): Su tiempo de retorno es 12 y su tiempo de espera 2."
  },
  {
    "id": "test_prueba_nov_2022_15",
    "t": "T2",
    "q": "Supongamos que en la cola de procesos listos tenemos tres procesos, P 1 , P 2 y P 3 , en ese orden, cuya siguiente ráfaga de CPU durará 4, 3 y 5 unidades de tiempo, respectivamente. Si antes de que la CPU quede libre, llega a la cola de listos un proceso P 4 cuya siguiente ráfaga de CPU va a durar 2 unidades de tiempo, entonces, dicho proceso tomará la CPU:",
    "opts": [
      "Como mucho, 8 unidades de tiempo después de llegar, si se usa round-robin con un quan- tum de 2 unidades y la CPU acaba de ser asignada a un proceso.",
      "Inmediatamente, expulsando al proceso que hay en la CPU, si el algoritmo es SRTF o por prioridad apropiativo (siempre que P 4 sea el proceso de mayor prioridad)."
    ],
    "a": 0,
    "source": "Test Prueba Nov 2022 (Q15)",
    "explanation": "Solución oficial (A): Como mucho, 8 unidades de tiempo después de llegar, si se usa round-robin con un quan- tum de 2 unidades y la CPU acaba de ser asignada a un proceso."
  },
  {
    "id": "test_prueba_nov_2022_17",
    "t": "T1",
    "q": "Una caracterı́stica de las listas de posibilidades que no tienen las listas de control de acceso es:",
    "opts": [
      "que se permiten operaciones con las posibilidades, como obtener una copia o eliminarlas.",
      "que es más sencillo recuperar todos los permisos de un objeto particular."
    ],
    "a": 0,
    "source": "Test Prueba Nov 2022 (Q17)",
    "explanation": "Solución oficial (A): que se permiten operaciones con las posibilidades, como obtener una copia o eliminarlas."
  },
  {
    "id": "test_prueba_nov_2022_18",
    "t": "T1",
    "q": "Un dominio de seguridad:",
    "opts": [
      "Es un conjunto de parejas hobjeto,derechosi",
      "Especifica los permisos que posee un usuario"
    ],
    "a": 0,
    "source": "Test Prueba Nov 2022 (Q18)",
    "explanation": "Solución oficial (A): Es un conjunto de parejas hobjeto,derechosi"
  },
  {
    "id": "test_prueba_nov_2022_19",
    "t": "T4",
    "q": "Si tenemos un fichero con los siguientes permisos: usuario1 grupo2 rwsr-sr--:",
    "opts": [
      "si lo ejecuta el usuario1 que pertenece al grupo1, su grupo se convierte en el grupo2 durante la ejecución del proceso.",
      "no puede ejecutarlo el usuario2 que pertenece al grupo2 porque no tiene permiso de ejecución (x) para el grupo."
    ],
    "a": 0,
    "source": "Test Prueba Nov 2022 (Q19)",
    "explanation": "Solución oficial (A): si lo ejecuta el usuario1 que pertenece al grupo1, su grupo se convierte en el grupo2 durante la ejecución del proceso."
  },
  {
    "id": "test_prueba_nov_2022_20",
    "t": "T1",
    "q": "En UNIX/Linux:",
    "opts": [
      "Un usuario puede pertenecer a varios dominios a la vez con distintos GID.",
      "Un usuario puede pertenecer a varios dominios a la vez con distintos UID y GID."
    ],
    "a": 0,
    "source": "Test Prueba Nov 2022 (Q20)",
    "explanation": "Solución oficial (A): Un usuario puede pertenecer a varios dominios a la vez con distintos GID."
  },
  {
    "id": "test_prueba_nov_2022_21",
    "t": "T1",
    "q": "Los privilegios de un usuario en un sistema:",
    "opts": [
      "dependen tanto de su identificador como de su contraseña.",
      "dependen únicamente de su identificador, ya que la contraseña solamente sirve para au- tenticarlo."
    ],
    "a": 1,
    "source": "Test Prueba Nov 2022 (Q21)",
    "explanation": "Solución oficial (B): dependen únicamente de su identificador, ya que la contraseña solamente sirve para au- tenticarlo."
  },
  {
    "id": "test_prueba_nov_2022_22",
    "t": "T4",
    "q": "En la implementación de ficheros y directorios en Unix, los bloques indirectos:",
    "opts": [
      "Los usan tanto los ficheros regulares como los directorios (si es necesario).",
      "Los usan los ficheros regulares (si es necesario), pero no los directorios."
    ],
    "a": 0,
    "source": "Test Prueba Nov 2022 (Q22)",
    "explanation": "Solución oficial (A): Los usan tanto los ficheros regulares como los directorios (si es necesario)."
  },
  {
    "id": "test_prueba_nov_2022_23",
    "t": "T4",
    "q": "En la implementación de ficheros mediante lista ligada:",
    "opts": [
      "Se consiguen utilizar todos los bloques del disco.",
      "Se produce mucha fragmentación externa."
    ],
    "a": 0,
    "source": "Test Prueba Nov 2022 (Q23)",
    "explanation": "Solución oficial (A): Se consiguen utilizar todos los bloques del disco."
  },
  {
    "id": "test_prueba_nov_2022_24",
    "t": "T4",
    "q": "Un fichero ejecutable que contiene código máquina es un fichero binario cuyo formato debe conocer:",
    "opts": [
      "Sólo el compilador-enlazador que genera dicho fichero binario. En los sistemas operativos modernos, el tipo de los ficheros es indiferente.",
      "Tanto el compilador-enlazador que lo genera como el sistema operativo donde se utiliza."
    ],
    "a": 1,
    "source": "Test Prueba Nov 2022 (Q24)",
    "explanation": "Solución oficial (B): Tanto el compilador-enlazador que lo genera como el sistema operativo donde se utiliza."
  },
  {
    "id": "test_prueba_nov_2022_25",
    "t": "T4",
    "q": "El campo ((enlaces)) de un nodo-i:",
    "opts": [
      "guarda el número de subdirectorios en el caso del nodo-i del directorio raı́z.",
      "guarda el número de entradas en directorios con ese nodo-i."
    ],
    "a": 1,
    "source": "Test Prueba Nov 2022 (Q25)",
    "explanation": "Solución oficial (B): guarda el número de entradas en directorios con ese nodo-i."
  },
  {
    "id": "test_prueba_nov_2022_26",
    "t": "T4",
    "q": "¿En qué implementación de directorios, de las vistas en clase, pueden aparecer huecos libres entre entradas de directorio?",
    "opts": [
      "Tanto en la implementación de directorios de Unix como en la de MS-DOS.",
      "Sólo en la implementación de directorios de Unix."
    ],
    "a": 0,
    "source": "Test Prueba Nov 2022 (Q26)",
    "explanation": "Solución oficial (A): Tanto en la implementación de directorios de Unix como en la de MS-DOS."
  },
  {
    "id": "test_prueba_nov_2022_28",
    "t": "T4",
    "q": "El número máximo de bloques lógicos que se deben leer de un disco para copiar en memoria el bloque N de un fichero es:",
    "opts": [
      "1 en asignación contigua.",
      "N − 2 con listas ligadas."
    ],
    "a": 0,
    "source": "Test Prueba Nov 2022 (Q28)",
    "explanation": "Solución oficial (A): 1 en asignación contigua."
  },
  {
    "id": "test_prueba_nov_2022_29",
    "t": "T4",
    "q": "Si queremos escribir un byte en la posición 4 500 000 (contando desde 0) de un fichero de 10 MB implementado mediante lista ligada sin ı́ndice, utilizando bloques lógicos de 4 kB y direcciones de disco de 4 bytes, entonces tendremos que:",
    "opts": [
      "Leer 1100 bloques y escribir 2 bloque",
      "Leer 1100 bloques y escribir 1 bloque."
    ],
    "a": 1,
    "source": "Test Prueba Nov 2022 (Q29)",
    "explanation": "Solución oficial (B): Leer 1100 bloques y escribir 1 bloque."
  },
  {
    "id": "test_prueba_nov_2022_30",
    "t": "T4",
    "q": "Si queremos añadir un bloque al final de un fichero con un tamaño de 10 MB implementado mediante nodos-i capaces de almacenar 13 direcciones (10 directas, 1 BSI, 1 BDI y 1 BTI), utilizando bloques lógicos de 4 kB, direcciones de disco de 4 bytes y suponiendo el nodo-i ya en memoria, entonces tendremos que:",
    "opts": [
      "Leer 2 bloques y escribir 1 bloque.",
      "Leer 2 bloques y escribir 2 bloques. Nº a b"
    ],
    "a": 1,
    "source": "Test Prueba Nov 2022 (Q30)",
    "explanation": "Solución oficial (B): Leer 2 bloques y escribir 2 bloques. Nº a b"
  }
];
